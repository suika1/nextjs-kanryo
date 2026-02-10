import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types/product';

type CartStoreState = {
  selectedProductIds: Product['id'][];
};

type CartStoreActions = {
  addToCart: (productId: Product['id']) => void;
  removeFromCart: (productId: Product['id']) => void;
  emptyCart: () => void;
};

type CartStore = CartStoreState & CartStoreActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      selectedProductIds: [],
      addToCart: (productId) => {
        set((state) => ({
          selectedProductIds: [...state.selectedProductIds, productId],
        }));
      },
      removeFromCart: (productId) => {
        set((state) => ({
          selectedProductIds: state.selectedProductIds.filter((id) => id !== productId),
        }));
      },
      emptyCart: () => {
        set((state) => ({ selectedProductIds: [] }));
      },
    }),
    { name: 'cart-storage' },
  ),
);
