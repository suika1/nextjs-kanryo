'use client';

import { CART_LS_KEY } from '@/app/constants';
import { Product } from '@/app/types/product';
import { Button } from '@/app/ui/button';
import { audiowide } from '@/app/ui/fonts';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function Page() {
  const router = useRouter();
  const [productIds, setProductIds] = useState<Product['id'][]>([]);
  const [isReadyToFetchProducts, setIsReadyToFetchProducts] = useState(false);
  const searchParams = useSearchParams();
  const getProducts = useQuery({
    queryKey: ['products', productIds],
    queryFn: async () => {
      const urlSearchParams = new URLSearchParams(
        productIds.map((id) => ['id', id]),
      );
      const res = await fetch(
        `/api/products?${urlSearchParams.toString()}`,
      );
      const json: { products: Product[] } = await res.json();
      const { products } = json;
      return products;
    },
    enabled: isReadyToFetchProducts && productIds.length > 0,
    refetchOnWindowFocus: false,
  });
  const submitOrder = useMutation({
    mutationFn: async (productArray: Product[]) => {
      const res = await fetch(`/api/orders`, {
        body: JSON.stringify(productArray?.map(product => product.id)),
        method: 'POST',
        redirect: "follow",
      });
      return res;
    },
  })
  const productArray = getProducts.data || [];

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem(CART_LS_KEY) || '[]');
    setProductIds(ids);
    setIsReadyToFetchProducts(true);
  }, []);

  useEffect(() => {
    const fn = async () => {
      const res = submitOrder.data;
      if (!res) {
        return;
      }
      if (res?.status === 401) {
        router.push('/login?from=/cart');
      }
      const json: { success: true } = await res.json();
      if (json.success) {
        router.push('/orders');
        localStorage.setItem(CART_LS_KEY, '[]');
        // TODO:
      }
    }

    fn();
  }, [submitOrder.data]);

  useEffect(() => {
    if (searchParams.get('from') === '/login' && productArray?.length > 0) {
      submitOrder.mutate(productArray);
    }
  }, [searchParams, productArray]);

  const totalPrice = productArray.reduce((sum, item) => sum + item.price, 0);

  if (!isReadyToFetchProducts || getProducts.isFetching || submitOrder.isPending) {
    return 'Загрузка...';
  }

  return (
    <div className="w-full max-w-7xl bg-neutral-900 grow">
      <div className="flex flex-col">
        <div className="mt-6 px-6">
          <h1 className={`${audiowide.className} mb-6 text-3xl text-red-400`}>
            Корзина
          </h1>

          {productArray.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="mb-4 text-xl text-gray-400">Ваша корзина пуста</p>
              <Link href="/">
                <Button className="hover:cursor-pointer">Перейти к товарам</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex flex-1 flex-col gap-4">
                {productArray.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-lg border border-neutral-700 bg-neutral-800 p-4"
                  >
                    <Link href={`/product/${item.id}`}>
                      <Image
                        src={item.pic}
                        alt={item.title}
                        width={120}
                        height={160}
                        className="rounded-md object-contain hover:cursor-pointer"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link href={`/product/${item.id}`}>
                          <h3
                            className={`${audiowide.className} text-lg hover:cursor-pointer hover:text-pink-500`}
                          >
                            {item.title}
                          </h3>
                        </Link>
                        <p className="mt-1 text-sm text-gray-400">
                          {item.brand} • {item.product_type}
                        </p>
                        {item.color ? (
                          <p className="text-sm text-gray-400">
                            Цвет: {item.color}
                          </p>
                        ) : null}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-400">
                            {/* TODO: Количество */}
                            Количество: 1
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={`${audiowide.className} text-lg text-red-400`}
                          >
                            {item.price} ₽
                          </span>
                          <span className="text-sm text-gray-500">
                            {item.price} ₽ x 1
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="shrink-0 lg:w-80">
                <div className="sticky top-6 rounded-lg border border-neutral-700 bg-neutral-800 p-6">
                  <h2
                    className={`${audiowide.className} mb-4 text-xl text-red-400`}
                  >
                    Итого
                  </h2>
                  <div className="mb-6 flex flex-col gap-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        Товаров ({productArray.length}):
                      </span>
                      <span className="text-gray-300">{totalPrice} ₽</span>
                    </div>
                    <div className="border-t border-neutral-700 pt-3">
                      <div className="flex justify-between">
                        <span
                          className={`${audiowide.className} text-lg text-red-400`}
                        >
                          К оплате:
                        </span>
                        <span
                          className={`${audiowide.className} text-lg text-red-400`}
                        >
                          {totalPrice} ₽
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => submitOrder.mutate(productArray)} className="w-full hover:cursor-pointer">
                    Оформить заказ
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
