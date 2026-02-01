'use server';

import { Order, OrderStatus } from '@/app/types/order';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export const createOrder = async (order: Pick<Order, 'user_id' | 'products'>) => {
  const deliveryDate = new Date((new Date()).getTime() + Math.random() * 60 * 1000);

  const data: Order[] = await sql`
    INSERT INTO orders ${
      sql({
        estimated_delivery_date: deliveryDate.toISOString().split('T')[0],
        user_id: order.user_id,
        status: 'IN_PROGRESS'
      }, 'user_id', 'estimated_delivery_date', 'status')
    }
    RETURNING *
  `;

  if (!data) {
    throw new Error('Order was not created');
  }

  const isCreated = await sql`
    INSERT INTO order_products ${
      sql(order.products.map(productId => ({
        product_id: productId,
        order_id: data[0].id,
      })), 'product_id', 'order_id')
    }
  `;

  if (!isCreated) {
    throw Error('Order_Products was not created');
  }
  return true;
};


export const getAllOrdersByUserId = async (userId: string) => {
  const orders = await sql<any[]>`
    SELECT
      o.*,
      ARRAY_AGG(op.product_id) AS product_ids
    FROM orders o
    JOIN order_products op ON o.id = op.order_id
    WHERE o.user_id = ${userId}
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `;

  return orders;
};
