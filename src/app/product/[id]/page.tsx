import { audiowide } from '@/ui/fonts';
import Header from '@/ui/header';
import Breadcrumbs from '@/ui/product/breadcrumbs';
import Rating from '@/ui/product/rating';
import RecommendedProductsInRow from '@/ui/product/recommended-products-in-row';
import AddToCartButton from '@/ui/product/add-to-cart-button';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/actions/products';

export default async function Page(props: { params: { id: string } }) {
  const params = await props.params;
  const product = await getProduct(params.id);

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
    product_type,
    color,
    weight,
    inStock,
  } = product;

  return (
    <div className="w-full max-w-7xl bg-neutral-900 pt-3 grow">
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
        <div className="ml-6 flex">
          <Image
            className="h-full max-h-[300px] w-full max-w-[300px]"
            src={pic}
            alt={`Товар: ${title}`}
            width={100}
            height={100}
          />
          <div className="mt-2 mr-4 ml-2 flex flex-col">
            <span className={`${audiowide.className} w-max truncate text-sm`}>
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
                {product_type}
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
        <span className="mt-8 ml-2 text-3xl text-red-400">Похожие товары</span>
        <RecommendedProductsInRow />
      </div>
    </div>
  );
}
