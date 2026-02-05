import RecommendedProducts from '@/src/app/ui/product/recommended-products';

export default function Loading() {
  return (
    <div className='max-w-7xl w-full bg-neutral-900 grow'>
      Загрузка...
      <RecommendedProducts products={[]} />
    </div>
  );
}
