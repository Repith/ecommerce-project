import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { CartItem, Product, Variant } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (data: Product, variant: Variant) => void;
  removeItem: (productId: string, variantId: string) => void;
  removeAll: () => void;
  decreaseItem: (productId: string, variantId: string) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],

      addItem: (product: Product, variant: Variant) => {
        const currentItems = get().items;

        const existingItemIndex = currentItems.findIndex(
          (currentItem) =>
            currentItem.product.id === product.id &&
            currentItem.variant.id === variant.id
        );

        if (existingItemIndex !== -1) {
          if (currentItems[existingItemIndex].quantity + 1 > variant.inStock) {
            toast.error(
              `You can't add more of ${product.name}. Not enough in stock.`
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
                product,
                variant,
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
