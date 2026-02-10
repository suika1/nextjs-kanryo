'use client';

import { MagnifyingGlassIcon, ShoppingCartIcon, TruckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/ui/button';
import Search from '@/ui/search';

export default function Header() {
  const pathname = usePathname();

  if (pathname === '/login') {
    return null;
  }

  return (
    <header className="sticky top-0 w-full max-w-7xl bg-neutral-900">
      <div className="ml-2 flex">
        <Link href="/">
          <span className="text-3xl text-pink-700" title="На главную">
            完了
          </span>
        </Link>
        <form className="flex grow" action="/search" aria-describedby="form-error">
          <Suspense fallback="Загрузка...">
            <Search className="ml-2" placeholder="Искать товар" />
          </Suspense>
          <Button>
            <MagnifyingGlassIcon className="h-6 w-6" />
          </Button>
        </form>
        <Link href="/orders" className="mr-2 flex items-center hover:opacity-80">
          <TruckIcon className="ml-3 h-6 w-6 text-red-400" title="Заказы" />
        </Link>
        <Link href="/cart" className="mr-4 flex items-center hover:opacity-80">
          <ShoppingCartIcon className="ml-3 h-6 w-6 text-red-400" title="Корзина" />
        </Link>
      </div>
    </header>
  );
}
