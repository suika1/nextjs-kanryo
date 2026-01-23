import { audiowide } from '@/app/ui/fonts';
import RecommendedProducts from '@/app/ui/product/recommended-products';
import clsx from 'clsx';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-800 font-sans">
      <main className="flex min-h-screen w-full max-w-7xl min-w-4xl flex-col items-center justify-between bg-neutral-900 px-16 py-32 sm:items-start text-red-400">
        <RecommendedProducts />
      </main>
    </div>
  );
}
