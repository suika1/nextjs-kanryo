'use client';

import { Button } from '@/ui/button';
import { useCartStore } from '@/stores/cart-store';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';

export default function AddToCartButton() {
  const { id } = useParams();
  const selectedProductIds = useCartStore((state) => state.selectedProductIds);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const isInCart = selectedProductIds.includes(id as string);

  const handleClick = () => {
    isInCart ? removeFromCart(id as string) : addToCart(id as string);
  };

  return (
    <Button
      className={`mt-4 size-max transition-colors duration-500 hover:cursor-pointer ${
        isInCart ? 'bg-green-500 hover:bg-green-400 active:bg-green-600' : ''
      }`}
      onClick={handleClick}
    >
      <span className="flex items-center gap-2 whitespace-nowrap">
        {isInCart ? (
          <>
            <CheckIcon className="h-5 w-5" />В корзине
          </>
        ) : (
          'Добавить в корзину'
        )}
      </span>
    </Button>
  );
}
