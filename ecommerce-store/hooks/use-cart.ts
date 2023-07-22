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
}

const useCart = create(
  persist<CartStore>((set, get) => ({
  items: [],
  addItem: (data: Product) => {
    const currentItems = get().items;
    const existingItemIndex = currentItems.findIndex((item) => item.id === data.id);
  
    if (existingItemIndex !== -1) {
      set((state) => {
        const newItems = [...state.items];
        if (newItems[existingItemIndex]) {
          newItems[existingItemIndex].quantity += 1;
        }
        return { items: newItems };
      });
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
    }
  
    toast.success('Item added to cart.');
  },
  
  // removeItem: (id: string) => {
  //   set({ items: [...get().items.filter((item) => item.id !== id)] });
  //   toast.success('Item removed from cart.');
  // },

  removeItem: (id: string) => {
    set((state) => {
      const newItems = state.items.map((item) => 
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      ).filter((item) => !(item.id === id && item.quantity === 1));
      return { items: newItems };
    });
    toast.success('Item removed from cart.');
  },
  

  removeAll: () => set({ items: [] }),
}), {
  name: 'cart-storage',
  storage: createJSONStorage(() => localStorage)
}));

export default useCart;
