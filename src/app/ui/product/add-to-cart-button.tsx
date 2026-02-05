'use client';

import { CART_LS_KEY } from '@/src/app/constants';
import { Product } from '@/src/app/types/product';
import { Button } from '@/src/app/ui/button';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AddToCartButton() {
  const { id } = useParams();
  const [isInCart, setIsInCart] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const LSArr: Product['id'][] = JSON.parse(localStorage.getItem(CART_LS_KEY) as string) || [];
      if (id && LSArr.includes(id as string)) {
        setIsInCart(true);
      } else {
        setIsInCart(false);
      }
    } catch (e) {
      setIsInCart(false);
    }
  }, []);

  const handleClick = () => {
    let updatedLSArr: Product['id'][] = JSON.parse(localStorage.getItem(CART_LS_KEY) as string) || [];
    updatedLSArr = isInCart
      ? updatedLSArr.filter(productId => productId !== id)
      : updatedLSArr.concat(id as string);

    localStorage.setItem(CART_LS_KEY, JSON.stringify(updatedLSArr));
    setIsInCart(prev => !prev);
  }

  if (isInCart === null) {
    return null;
  }

  return (
    <Button
      className={`mt-4 size-max hover:cursor-pointer transition-colors duration-500 ${
        isInCart
          ? 'bg-green-500 hover:bg-green-400 active:bg-green-600'
          : ''
      }`}
      onClick={handleClick}
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
