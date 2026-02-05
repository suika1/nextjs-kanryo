import { getCurrentUser } from '@/src/app/actions/auth';
import { getAllOrdersByUserId } from '@/src/app/lib/actions/orders';
import { getProductsByIds } from '@/src/app/lib/actions/products';
import { OrderStatus } from '@/src/app/types/order';
import { Product } from '@/src/app/types/product';
import { Button } from '@/src/app/ui/button';
import { audiowide } from '@/src/app/ui/fonts';
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

export default async function Page() {
  const user = await getCurrentUser();

  const ordersWithProducts = [];
  if (user) {
    const rawOrders = await getAllOrdersByUserId(user.id);

    for (const row of rawOrders) {
      const productIds: string[] = row.product_ids || [];
      const products = productIds.length
        ? await getProductsByIds(productIds)
        : [];
      const totalPrice = products.reduce((sum, p) => sum + (p.price || 0), 0);

      ordersWithProducts.push({
        id: row.id,
        user_id: row.user_id,
        created_at: row.created_at,
        estimated_delivery_date: row.estimated_delivery_date,
        products,
        status: row.status,
        totalPrice,
      });
    }
  }

  return (
    <div className="w-full max-w-7xl bg-neutral-900 grow">
      <div className="flex flex-col">
        <div className="mt-6 px-6">
          <h1 className={`${audiowide.className} mb-6 text-3xl text-red-400`}>
            Мои заказы
          </h1>

          {ordersWithProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="mb-4 text-xl text-gray-400">
                У вас пока нет заказов
              </p>
              <Link href="/">
                <Button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-400 hover:cursor-pointer">
                  Перейти к товарам
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {ordersWithProducts.map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg border border-neutral-700 bg-neutral-800 p-6"
                >
                  <div className="mb-4 flex items-center justify-between border-b border-neutral-700 pb-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4">
                        <span
                          className={`${audiowide.className} text-xl text-red-400`}
                        >
                          Заказ #{order.id}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold text-nowrap ${getStatusColor(
                            order.status,
                          )} bg-neutral-700`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 text-sm text-gray-400">
                        <span>Создан: {formatDate(order.created_at)}</span>
                        <span>
                          Доставка: {formatDate(order.estimated_delivery_date)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-400">
                        Товаров: {order.products.length}
                      </span>
                      <div
                        className={`${audiowide.className} mt-1 text-2xl text-red-400`}
                      >
                        {order.totalPrice} ₽
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {order.products.map((product: Product) => (
                      <div
                        key={product.id}
                        className="flex gap-4 rounded border border-neutral-700 bg-neutral-900 p-3"
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
                        <div className="flex flex-1 flex-col justify-center">
                          <Link href={`/product/${product.id}`}>
                            <h3
                              className={`${audiowide.className} text-base hover:cursor-pointer hover:text-pink-500`}
                            >
                              {product.title}
                            </h3>
                          </Link>
                          <p className="mt-1 text-xs text-gray-400">
                            {product.brand} • {product.product_type}
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
  );
}
