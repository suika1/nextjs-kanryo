'use client';

import { Button } from '@/app/ui/button';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function AddToCartButton() {
  const [isInCart, setIsInCart] = useState(false);

  return (
    <Button
      className={`mt-4 size-max hover:cursor-pointer transition-colors duration-500 ${
        isInCart
          ? 'bg-green-500 hover:bg-green-400 active:bg-green-600'
          : ''
      }`}
      onClick={() => setIsInCart(prev => !prev)}
    >
      <span className="flex items-center gap-2 whitespace-nowrap">
        {isInCart ? (
          <>
            <CheckIcon className="h-5 w-5" />
            В корзине
          </>
        ) : (
          'Добавить в корзину'
        )}
      </span>
    </Button>
  );
}
