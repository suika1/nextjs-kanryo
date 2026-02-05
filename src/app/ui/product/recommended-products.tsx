import { Product } from '@/src/app/types/product';
import { Card } from '@/src/app/ui/product/card';

export default async function RecommendedProducts({ products }: { products: Product[] }) {
  return (
    <div className="flex content-start mx-15 items-stretch flex-row flex-wrap justify-between gap-4 max-w-7xl mt-3">
      {products.map(product => (
        <Card
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
}
