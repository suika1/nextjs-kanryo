import Header from '@/app/ui/header';
import RecommendedProducts from '@/app/ui/product/recommended-products';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-800 font-sans">
      <main className="flex min-h-screen min-w-7xl flex-col items-center text-red-400">
        <Header />
        <div className='max-w-7xl w-full bg-neutral-900 min-h-screen'>
          <RecommendedProducts />
        </div>
      </main>
    </div>
  );
}
