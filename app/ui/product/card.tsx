'use client';

import { Product } from '@/app/types/product';
import { audiowide } from '@/app/ui/fonts';
import Rating from '@/app/ui/product/rating';
import { StarIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function Card({
  title,
  id,
  price,
  pic,
  rating,
}: Product) {
  const { push } = useRouter();

  const navigateToProduct = () => {
    push(`/product/${id}`);
  };
  return (
    <div className="flex flex-col justify-around py-1">
      <Image
        src={pic as string}
        alt={`Picture for ${title}`}
        width={203}
        height={270}
        className="h-[270px] w-[203px] rounded-md object-contain hover:cursor-pointer"
        onClick={navigateToProduct}
      />
      <div className="mt-3 flex flex-col">
        <span
          className={`${audiowide.className} w-max truncate text-sm`}
        >
          {price} ₽
        </span>
        <span
          className={`${audiowide.className} w-max truncate text-sm hover:cursor-pointer hover:text-pink-500`}
          onClick={navigateToProduct}
        >
          {title}
        </span>
        <Rating rating={rating} />
      </div>
    </div>
  );
}
