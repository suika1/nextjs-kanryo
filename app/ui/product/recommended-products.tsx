import { Card } from '@/app/ui/product/card';

export default function RecommendedProducts() {
  return (
    <div className="flex content-start items-stretch flex-row flex-wrap justify-between gap-4">
      <Card
        title="Футболка"
        price={600}
        rating={4.3}
        pic='/futbolka-oversayz-2.png'
      />
      <Card
        title="Шапка"
        price={350}
        rating={5.0}
        pic='/hat.jpg'
      />
      <Card
        title="Ботинки"
        price={1233}
        rating={4.8}
        pic='/boots.jpg'
      />
      <Card
        title="Рубашка"
        price={777}
        rating={4.9}
        pic='/t-shirt.webp'
      />
    </div>
  );
}
