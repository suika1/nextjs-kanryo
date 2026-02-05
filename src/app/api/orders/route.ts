// import { NextResponse } from 'next/server';
// import { createOrder } from '@/app/lib/actions/orders';
// import { getCurrentUser } from '@/app/actions/auth';
// import { Product } from '@/app/types/product';

// export const POST = async (request: Request) => {
//   try {
//     const user = await getCurrentUser();
//     if (!user) {
//       return NextResponse.json(
//         { error: 'Not authorized' },
//         { status: 401 },
//       );
//     }

//     const productIds: Product['id'][] = await request.json();


//     if (!productIds) {
//       return NextResponse.json(
//         { error: 'Body should contain product ids' },
//         { status: 400 },
//       );
//     }

//     await createOrder({
//       products: productIds,
//       user_id: user?.id,
//     });

//     return NextResponse.json({ success: true }, { status: 201 });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message ?? 'Internal server error' },
//       { status: 500 },
//     );
//   }
// };
