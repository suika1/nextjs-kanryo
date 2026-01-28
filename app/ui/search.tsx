'use client';

import { Product } from '@/app/types/product';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { audiowide } from '@/app/ui/fonts';
import clsx from 'clsx';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string;
}

export default function Search({ placeholder, className, ...rest }: Props) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // TODO:
    const fetchProducts = async () => {
      try {
        setIsloading(true);
        console.log('sending');
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Не удалось получить список товаров');
        }
        const result: { products: Product[] } = await response.json();
        if (!result?.products) {
          throw new Error('Не удалось получить список товаров');
        }
        setProducts(result?.products);
      } catch (err: any) {
        setError(err?.message);
      } finally {
        setIsloading(false);
      }
    };

    fetchProducts();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setIsDropdownOpen(term.length > 0);
  };

  const filteredProducts = searchTerm
    ? products
        .filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .slice(0, 5)
    : [];

  const handleProductClick = () => {
    setIsDropdownOpen(false);
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const renderDropdownMessages = () => {
    if (!isDropdownOpen) {
      return null;
    }
    if (error) {
      <div className="absolute top-full right-0 left-0 z-50 mt-1 rounded-md border border-neutral-700 bg-neutral-800 p-4 shadow-lg">
        <p className="text-sm text-gray-400">{error}</p>
      </div>;
    }
    if (!searchTerm || (!isLoading && filteredProducts.length !== 0)) {
      return null;
    }

    const message = isLoading ? 'Загрузка...' : 'Товары не найдены';

    return (
      <div className="absolute top-full right-0 left-0 z-50 mt-1 rounded-md border border-neutral-700 bg-neutral-800 p-4 shadow-lg">
        <p className="text-sm text-gray-400">{message}</p>
      </div>
    );
  };

  return (
    <div
      {...rest}
      ref={searchRef}
      className={clsx('relative flex flex-1 shrink-0', className)}
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        ref={inputRef}
        id="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
        onFocus={(e) => {
          if (e.target.value.length > 0) {
            setIsDropdownOpen(true);
          }
        }}
      />
      <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-red-900" />

      {isDropdownOpen && filteredProducts.length > 0 && (
        <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-96 overflow-y-auto rounded-md border border-neutral-700 bg-neutral-800 shadow-lg">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div
                onClick={() => handleProductClick()}
                className="flex cursor-pointer gap-3 border-b border-neutral-700 p-3 last:border-b-0 hover:bg-neutral-700"
              >
                <Image
                  src={product.pic}
                  alt={product.title}
                  width={60}
                  height={80}
                  className="shrink-0 rounded object-contain"
                />
                <div className="flex min-w-0 flex-col justify-center">
                  <span
                    className={`${audiowide.className} truncate text-sm text-red-400`}
                  >
                    {product.title}
                  </span>
                  <span className="text-xs text-gray-400">{product.brand}</span>
                  <span
                    className={`${audiowide.className} mt-1 text-sm text-red-300`}
                  >
                    {product.price} ₽
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {renderDropdownMessages()}
    </div>
  );
}
