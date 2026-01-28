import Header from '@/app/ui/header';
import RecommendedProducts from '@/app/ui/product/recommended-products';

export default function Loading() {
  return (
    <div className='max-w-7xl w-full bg-neutral-900 min-h-screen'>
      Загрузка...
      <RecommendedProducts products={[]} />
    </div>
  );
}
