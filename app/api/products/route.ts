import { NextResponse } from 'next/server';
import { getAllProducts, searchProducts } from '@/app/lib/actions/products';

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get('q') || '';
    const limitParam = url.searchParams.get('limit');
    const limit = limitParam
      ? Math.min(100, Math.max(1, Number(limitParam)))
      : 50;

    const products = q
      ? await searchProducts(q, limit)
      : await getAllProducts();

    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
