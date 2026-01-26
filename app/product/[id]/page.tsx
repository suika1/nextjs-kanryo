import { findMockProductById } from '@/app/mocks/products';
import { audiowide } from '@/app/ui/fonts';
import Header from '@/app/ui/header';
import Breadcrumbs from '@/app/ui/product/breadcrumbs';
import Rating from '@/app/ui/product/rating';
import RecommendedProductsInRow from '@/app/ui/product/recommended-products-in-row';
import AddToCartButton from '@/app/ui/product/add-to-cart-button';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: { id: string } }) {
  const params = await props.params;
  const product = await findMockProductById(+params.id);

  if (!params.id || !product) {
    notFound();
  }

  const {
    pic,
    price,
    rating,
    title,
    description,
    material,
    brand,
    size,
    productType,
    color,
    weight,
    inStock,
  } = product;

  return (
    <div className="min-h-screen bg-neutral-800 font-sans">
      <main className="flex min-h-screen min-w-7xl flex-col items-center text-red-400">
        <Header />
        <div className="min-h-screen w-full max-w-7xl bg-neutral-900 pt-3">
          <div className="flex flex-col">
            <Breadcrumbs
              breadcrumbs={[
                { label: 'Все товары', href: '/' },
                {
                  label: title,
                  href: `/product/${params.id}`,
                  active: true,
                },
              ]}
            />
            <div className="flex ml-6">
              <Image className='grow' src={pic} alt={`Товар: ${title}`} width={100} height={100} />
              <div className="flex flex-col ml-2 mt-2 mr-4">
                <span
                  className={`${audiowide.className} w-max truncate text-sm`}
                >
                  {title}
                </span>
                <Rating rating={rating} />
                <div className="mt-4 flex flex-col gap-2 text-sm">
                  <div>
                    <span className="font-semibold text-red-300">Цена:</span>{' '}
                    <span className={`${audiowide.className}`}>{price} ₽</span>
                  </div>
                  <div>
                    <span className="font-semibold text-red-300">Бренд:</span>{' '}
                    {brand}
                  </div>
                  <div>
                    <span className="font-semibold text-red-300">Тип:</span>{' '}
                    {productType}
                  </div>
                  <div>
                    <span className="font-semibold text-red-300">Материал:</span>{' '}
                    {material}
                  </div>
                  <div>
                    <span className="font-semibold text-red-300">Размер:</span>{' '}
                    {Array.isArray(size) ? size.join(', ') : size}
                  </div>
                  {color ? (
                    <div>
                      <span className="font-semibold text-red-300">Цвет:</span>{' '}
                      {color}
                    </div>
                  ) : null}
                  {weight ? (
                    <div>
                      <span className="font-semibold text-red-300">Вес:</span>{' '}
                      {weight}
                    </div>
                  ) : null}
                  <div>
                    <span className="font-semibold text-red-300">Наличие:</span>{' '}
                    <span className={inStock ? 'text-green-400' : 'text-red-500'}>
                      {inStock ? 'В наличии' : 'Нет в наличии'}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="font-semibold text-red-300">Описание:</span>
                    <p className="mt-1 text-gray-300">{description}</p>
                  </div>
                </div>
                <AddToCartButton />
              </div>
            </div>
            <span className='text-3xl text-red-400 ml-2 mt-8'>Похожие товары</span>
            <RecommendedProductsInRow />
          </div>
        </div>
      </main>
    </div>
  );
}
