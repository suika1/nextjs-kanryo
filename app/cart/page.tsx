import { findMockProductById } from '@/app/mocks/products';
import { Button } from '@/app/ui/button';
import { audiowide } from '@/app/ui/fonts';
import Header from '@/app/ui/header';
import Image from 'next/image';
import Link from 'next/link';

// Моковые данные корзины (в будущем это будет из состояния/контекста)
const mockCartItems = [
  { productId: 1, quantity: 2 },
  { productId: 3, quantity: 1 },
  { productId: 4, quantity: 1 },
];

export default function Page() {
  const cartItems = mockCartItems
    .map((item) => {
      const product = findMockProductById(item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-800 font-sans">
      <main className="flex min-h-screen min-w-7xl flex-col items-center text-red-400">
        <Header />
        <div className="min-h-screen w-full max-w-7xl bg-neutral-900">
          <div className="flex flex-col">
            <div className="mt-6 px-6">
              <h1 className={`${audiowide.className} text-3xl text-red-400 mb-6`}>
                Корзина
              </h1>

              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-xl text-gray-400 mb-4">
                    Ваша корзина пуста
                  </p>
                  <Link href="/">
                    <Button>Перейти к товарам</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Список товаров */}
                  <div className="flex-1 flex flex-col gap-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 bg-neutral-800 rounded-lg border border-neutral-700"
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
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <Link href={`/product/${item.id}`}>
                              <h3
                                className={`${audiowide.className} text-lg hover:text-pink-500 hover:cursor-pointer`}
                              >
                                {item.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-400 mt-1">
                              {item.brand} • {item.productType}
                            </p>
                            {item.color ? (
                              <p className="text-sm text-gray-400">
                                Цвет: {item.color}
                              </p>
                            ) : null}
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-400">
                                Количество: {item.quantity}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span
                                className={`${audiowide.className} text-lg text-red-400`}
                              >
                                {item.price * item.quantity} ₽
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                {item.price} ₽ × {item.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Итоговая информация */}
                  <div className="lg:w-80 shrink-0">
                    <div className="sticky top-6 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
                      <h2
                        className={`${audiowide.className} text-xl text-red-400 mb-4`}
                      >
                        Итого
                      </h2>
                      <div className="flex flex-col gap-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">
                            Товаров ({totalItems}):
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
                      <Button className="w-full hover:cursor-pointer">
                        Оформить заказ
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
