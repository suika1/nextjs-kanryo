import { getAllProducts } from '@/app/lib/actions/products';
import RecommendedProducts from '@/app/ui/product/recommended-products';

export default async function Home() {
  const products = await getAllProducts();
  return (
    <div className='max-w-7xl w-full bg-neutral-900 min-h-max grow'>
      <RecommendedProducts products={products} />
    </div>
  );
}
