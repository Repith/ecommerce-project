import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId: string) => void;
  removeAll: () => void;
  decreaseItem: (productId: string, variantId: string) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],

      addItem: (item: CartItem) => {
        const currentItems = get().items;
        console.log(item);
        const existingItemIndex = currentItems.findIndex(
          (currentItem) =>
            currentItem.product.id === item.product.id &&
            currentItem.variant.id === item.variant.id
        );

        if (existingItemIndex !== -1) {
          if (
            currentItems[existingItemIndex].quantity + 1 >
            item.variant.inStock
          ) {
            toast.error(
              `You can't add more of ${item.product.name}. Not enough in stock.`
            );
          } else {
            set((state) => {
              const newItems = [...state.items];
              if (newItems[existingItemIndex]) {
                newItems[existingItemIndex].quantity += 1;
              }
              return { items: newItems };
            });
          }
        } else {
          set((state) => ({
            items: [
              ...state.items,
              {
                ...item,
                quantity: 1,
              },
            ],
          }));
          toast.success("Item added to cart.");
        }
      },

      removeItem: (productId: string, variantId: string) => {
        set({
          items: [
            ...get().items.filter(
              (item) =>
                item.product.id !== productId || item.variant.id !== variantId
            ),
          ],
        });
        toast.success("Item removed from cart.");
      },

      decreaseItem: (productId: string, variantId: string) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) =>
            item.product.id === productId && item.variant.id === variantId
        );

        if (existingItemIndex !== -1) {
          if (currentItems[existingItemIndex].quantity > 1) {
            set((state) => {
              const newItems = [...state.items];
              if (newItems[existingItemIndex]) {
                newItems[existingItemIndex].quantity -= 1;
              }
              return { items: newItems };
            });
          } else {
            set((state) => ({
              items: state.items.filter(
                (item) =>
                  item.product.id !== productId || item.variant.id !== variantId
              ),
            }));
            toast.success("Item removed from cart.");
          }
        }
      },

      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
