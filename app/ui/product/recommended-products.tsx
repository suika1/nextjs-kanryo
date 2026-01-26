import { mockProducts } from '@/app/mocks/products';
import { Card } from '@/app/ui/product/card';

export default function RecommendedProducts() {
  return (
    <div className="flex content-start mx-15 items-stretch flex-row flex-wrap justify-between gap-4 max-w-7xl mt-3">
      {mockProducts.map(product => (
        <Card
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
}
