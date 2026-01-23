import { Card } from '@/app/ui/product/card';

export default function CardWrapper() {
  return (
    <div className="flex content-start items-stretch flex-row flex-wrap justify-between">
      <Card title="Футболка" price={600} />
      <Card title="Шапка" price={350} />
      <Card title="Ботинки" price={1233} />
      <Card title="Рубашка" price={777} />
    </div>
  );
}
