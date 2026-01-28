'use server';

import { Order } from '@/app/types/order';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export const createOrder = async (order: Order) => {
  const isCreated = await sql`
    INSERT INTO orders (
      user_id
      created_at
      estimated_delivery_date
      products
      status
    ) VALUES (
      ${order.user_id},
      ${order.created_at},
      ${order.estimated_delivery_date},
      ${order.products},
      ${order.status}
    )
  `;
  if (!isCreated) {
    throw Error('Order was not created');
  }
  return true;
};

export const getAllOrdersByUserId = async (userId: string) => {
  const orders = await sql<Order[]>`
    SELECT * FROM orders
    WHERE user_id = ${userId}
  `;
  return orders;
};
