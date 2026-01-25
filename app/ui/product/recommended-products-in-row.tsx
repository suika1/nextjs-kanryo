import { mockProducts } from '@/app/mocks/products';
import { Card } from '@/app/ui/product/card';

export default function RecommendedProductsInRow() {
  return (
    <div className="mt-2 overflow-x-auto">
      <div className="flex flex-row gap-4 min-w-max pb-4">
        {mockProducts.map(product => (
          <Card
            key={product.id}
            {...product}
          />
        ))}
      </div>
    </div>
  );
}
