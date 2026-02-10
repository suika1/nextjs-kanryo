import { getAllProducts } from '@/lib/actions/products';
import { Card } from '@/ui/product/card';

export default async function RecommendedProductsInRow() {
  const products = await getAllProducts();
  return (
    <div className="mt-2 overflow-x-auto">
      <div className="flex flex-row gap-4 min-w-max pb-4">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
