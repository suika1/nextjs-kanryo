import { audiowide } from '@/app/ui/fonts';
import { StarIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

export function Card({
  title,
  price,
  pic,
  rating,
}: {
  title: string;
  price: number;
  pic?: string;
  rating?: number;
}) {
  return (
    <div className="flex flex-col justify-around py-1">
      <Image
        src={pic as string}
        alt={`Picture for ${title}`}
        width={203}
        height={270}
        className='rounded-md hover:cursor-pointer w-[203px] h-[270px] object-contain'
      />
      <div className='flex flex-col mt-3'>
        <span className={`${audiowide.className} truncate text-sm hover:text-pink-500 hover:cursor-pointer w-max`}>
          {title}
        </span>
        {rating ? (
          <div className="flex items-center w-max">
            <StarIcon className='h-6 w-6 fill-yellow-500' />
            <span className="text-sm">
              {rating}
            </span>
          </div>
        ) : (
          <span className='text-sm'>
            Оценок пока нет
          </span>
        )}
      </div>
    </div>
  );
}
