import { NextResponse } from 'next/server';
import { getAllProducts } from '@/app/lib/actions/products';

export const GET = async () => {
  try {
    const products = await getAllProducts();

    return NextResponse.json({
      products,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
