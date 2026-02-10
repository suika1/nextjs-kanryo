'use server';

import { Product } from '@/types/product';
import { db } from '@/db';
import { products as productsTable } from '@/db/schema';
import { ilike, inArray, eq, or } from 'drizzle-orm';

export const getProduct = async (productId: string) => {
  const product = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, productId))
    .limit(1);

  if (!product?.length) {
    return null;
  }
  return product[0] as Product;
};

export const getAllProducts = async () => {
  const products = await db.select().from(productsTable);
  return products as Product[];
};

export const searchProducts = async (query: string, limit = 50) => {
  const q = (query || '').trim();
  if (!q) return [] as Product[];

  const products = await db
    .select()
    .from(productsTable)
    .where(
      or(
        ilike(productsTable.title, `%${q}%`),
        ilike(productsTable.brand, `%${q}%`),
        ilike(productsTable.color, `%${q}%`),
      ),
    )
    .limit(limit);

  return products as Product[];
};

export const getProductsByIds = async (productIds: string[]) => {
  if (!productIds || !productIds.length) return [] as Product[];

  const products = await db
    .select()
    .from(productsTable)
    .where(inArray(productsTable.id, productIds));

  return products as Product[];
};
