'use server';

import { Product } from '@/src/app/types/product';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export const getProduct = async (productId: string) => {
  const product = await sql<Product[]>`SELECT * FROM products WHERE id = ${productId}`;
  if (!product?.length) {
    return null;
  }
  return product[0];
};

export const getAllProducts = async () => {
  const products = await sql<Product[]>`SELECT * FROM products`;
  return products;
};

export const searchProducts = async (query: string, limit = 50) => {
  const q = (query || '').trim();
  if (!q) return [] as Product[];

  const pattern = `%${q}%`;

  const products = await sql<Product[]>`
    SELECT * FROM products
    WHERE title ILIKE ${pattern}
      OR brand ILIKE ${pattern}
      OR color ILIKE ${pattern}
    LIMIT ${limit}
  `;

  return products;
};

export const getProductsByIds = async (productIds: string[]) => {
  if (!productIds || !productIds.length) return [] as Product[];

  const products = await sql<Product[]>`
    SELECT * FROM products
    WHERE id = ANY(${productIds}::uuid[])
  `;
  return products;
};
