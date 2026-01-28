import { Product } from '@/app/types/product'
import { StarIcon } from '@heroicons/react/20/solid';

export default function Rating({ rating }: { rating: Product['rating'] }) {
  if (!rating) {
    return (<span className="text-sm">Оценок пока нет</span>);
  }

  return (
    <div className="flex w-max items-center">
      <StarIcon className="h-6 w-6 fill-yellow-500" />
      <span className="text-sm">{rating / 10}</span>
    </div>
  );
}
