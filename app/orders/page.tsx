import { findMockProductById } from '@/app/mocks/products';
import { mockOrders, OrderStatus } from '@/app/mocks/orders';
import { audiowide } from '@/app/ui/fonts';
import Header from '@/app/ui/header';
import Image from 'next/image';
import Link from 'next/link';

const getStatusLabel = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.IN_PROGRESS:
      return 'В обработке';
    case OrderStatus.DELIVERED:
      return 'Доставлен';
    case OrderStatus.CANCELLED:
      return 'Отменен';
    case OrderStatus.DONE:
      return 'Завершен';
    default:
      return status;
  }
};

const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.IN_PROGRESS:
      return 'text-yellow-400';
    case OrderStatus.DELIVERED:
      return 'text-green-400';
    case OrderStatus.CANCELLED:
      return 'text-red-500';
    case OrderStatus.DONE:
      return 'text-blue-400';
    default:
      return 'text-gray-400';
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function Page() {
  const ordersWithProducts = mockOrders.map((order) => {
    const products = order.products
      .map((productId) => findMockProductById(productId))
      .filter((product): product is NonNullable<typeof product> => product !== null);

    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

    return {
      ...order,
      products,
      totalPrice,
    };
  });

  return (
    <div className="min-h-screen bg-neutral-800 font-sans">
      <main className="flex min-h-screen min-w-7xl flex-col items-center text-red-400">
        <Header />
        <div className="min-h-screen w-full max-w-7xl bg-neutral-900">
          <div className="flex flex-col">
            <div className="mt-6 px-6">
              <h1 className={`${audiowide.className} text-3xl text-red-400 mb-6`}>
                Мои заказы
              </h1>

              {ordersWithProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-xl text-gray-400 mb-4">
                    У вас пока нет заказов
                  </p>
                  <Link href="/">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400">
                      Перейти к товарам
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {ordersWithProducts.map((order) => (
                    <div
                      key={order.id}
                      className="p-6 bg-neutral-800 rounded-lg border border-neutral-700"
                    >
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-700">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-4">
                            <span
                              className={`${audiowide.className} text-xl text-red-400`}
                            >
                              Заказ #{order.id}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                order.status,
                              )} bg-neutral-700`}
                            >
                              {getStatusLabel(order.status)}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1 text-sm text-gray-400">
                            <span>
                              Создан: {formatDate(order.createdAt)}
                            </span>
                            <span>
                              Доставка: {formatDate(order.estimatedDeliveryDate)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-400">
                            Товаров: {order.products.length}
                          </span>
                          <div
                            className={`${audiowide.className} text-2xl text-red-400 mt-1`}
                          >
                            {order.totalPrice} ₽
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        {order.products.map((product) => (
                          <div
                            key={product.id}
                            className="flex gap-4 p-3 bg-neutral-900 rounded border border-neutral-700"
                          >
                            <Link href={`/product/${product.id}`}>
                              <Image
                                src={product.pic}
                                alt={product.title}
                                width={80}
                                height={100}
                                className="rounded-md object-contain hover:cursor-pointer"
                              />
                            </Link>
                            <div className="flex-1 flex flex-col justify-center">
                              <Link href={`/product/${product.id}`}>
                                <h3
                                  className={`${audiowide.className} text-base hover:text-pink-500 hover:cursor-pointer`}
                                >
                                  {product.title}
                                </h3>
                              </Link>
                              <p className="text-xs text-gray-400 mt-1">
                                {product.brand} • {product.productType}
                              </p>
                              {product.color ? (
                                <p className="text-xs text-gray-400">
                                  Цвет: {product.color}
                                </p>
                              ) : null}
                            </div>
                            <div className="flex items-center">
                              <span
                                className={`${audiowide.className} text-lg text-red-400`}
                              >
                                {product.price} ₽
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
