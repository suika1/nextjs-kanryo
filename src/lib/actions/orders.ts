'use server';

import dayjs from 'dayjs';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { orderProducts as orderProductsTable, orders as ordersTable } from '@/db/schema';
import { getCurrentUser } from '@/lib/actions/auth';
import { Order, OrderStatus } from '@/types/order';
import type { Product } from '@/types/product';

export const createOrder = async (products: Product['id'][]) => {
  const user = await getCurrentUser();
  if (!user) {
    return { error: 'Could not find user' };
  }

  const deliveryDate = dayjs()
    .add(Math.ceil(Math.random() * 5), 'minute')
    .toDate();

  const data = await db
    .insert(ordersTable)
    .values({
      userId: user.id,
      estimatedDeliveryDate: deliveryDate,
      status: OrderStatus.IN_PROGRESS,
    })
    .returning();

  if (!data || !data[0]) {
    throw new Error('Order was not created');
  }

  const isCreated = await db.insert(orderProductsTable).values(
    products.map((productId) => ({
      orderId: data[0].id,
      productId: productId,
    })),
  );

  if (!isCreated) {
    throw new Error('Order_Products was not created');
  }
  return { success: true };
};

export const getAllOrdersByUserId = async (userId: string) => {
  const orders = await db.select().from(ordersTable).where(eq(ordersTable.userId, userId));

  // Fetch products for each order
  const ordersWithProducts = await Promise.all(
    orders.map(async (order) => {
      const products = await db
        .select()
        .from(orderProductsTable)
        .where(eq(orderProductsTable.orderId, order.id));

      return {
        ...order,
        product_ids: products.map((p) => p.productId),
      };
    }),
  );

  return ordersWithProducts;
};
