'use server';

import { Product } from '@/app/types/product';
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
