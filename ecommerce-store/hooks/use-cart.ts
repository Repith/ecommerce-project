import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from '@/types';
import { AlertTriangle } from 'lucide-react';

interface CartStore {
  items: (Product & { quantity: number })[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  decreaseItem: (id: string) => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
  items: [],
  
  addItem: (data: Product) => {
    const currentItems = get().items;
    const existingItemIndex = currentItems.findIndex((item) => item.id === data.id);
  
    if (existingItemIndex !== -1) {
      if (currentItems[existingItemIndex].quantity + 1 > data.inStock) {
        toast.error(`You can't add more of ${data.name}. Not enough in stock.`);
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
            ...data,
            quantity: 1,
          },
        ],
      }));
      toast.success('Item added to cart.');
    }
  },
  
  
  removeItem: (id: string) => {
    set({ items: [...get().items.filter((item) => item.id !== id)] });
    toast.success('Item removed from cart.');
  },

  decreaseItem: (id: string) => {
    const currentItems = get().items;
    const existingItemIndex = currentItems.findIndex((item) => item.id === id);
  
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
          items: state.items.filter((item) => item.id !== id),
        }));
        toast.success('Item removed from cart.');
      }
    }
  },
  
  

  removeAll: () => set({ items: [] }),
}), {
  name: 'cart-storage',
  storage: createJSONStorage(() => localStorage)
}));

export default useCart;
