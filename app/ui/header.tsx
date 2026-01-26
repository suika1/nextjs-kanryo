'use client';

import { Button } from '@/app/ui/button';
import Search from '@/app/ui/search';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Header() {
  return (
    <header className="w-full max-w-7xl bg-neutral-900">
      <div className="ml-2 flex">
        <Link href="/">
          <span className="text-3xl text-pink-700">
            完了
          </span>
        </Link>
        <form
          className="flex grow"
          action="/search"
          aria-describedby="form-error"
        >
          <Suspense fallback="Loading...">
            <Search className="ml-2" placeholder="Искать товар" />
          </Suspense>
          <Button>
            <MagnifyingGlassIcon className="h-6 w-6" />
          </Button>
        </form>
        <Link href="/orders" className="flex items-center mr-2 hover:opacity-80">
          <TruckIcon className="h-6 w-6 text-red-400 ml-3" />
        </Link>
        <Link href="/cart" className="flex items-center mr-4 hover:opacity-80">
          <ShoppingCartIcon className="h-6 w-6 text-red-400 ml-3" />
        </Link>
      </div>
    </header>
  );
}
