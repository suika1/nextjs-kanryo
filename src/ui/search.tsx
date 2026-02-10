'use client';

import { Product } from '@/types/product';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { audiowide } from '@/ui/fonts';
import clsx from 'clsx';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import usePrevious from '@/hooks/usePrevious';

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
  const [isSearchInit, setIsSearchInit] = useState(false);
  const prevIsLoading = usePrevious(isLoading);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const controller = new AbortController();
    setIsSearchInit(true);

    const doSearch = async (term: string) => {
      try {
        setError(null);
        setIsloading(true);
        setIsSearchInit(false);
        setProducts([]);
        const res = await fetch(`/api/products?q=${encodeURIComponent(term)}&limit=10`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Не удалось выполнить поиск');
        const json: { products: Product[] } = await res.json();
        setProducts(json.products || []);
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        setError(err?.message || 'Ошибка');
      } finally {
        setIsloading(false);
      }
    };

    if (searchTerm?.trim()?.length >= 3) {
      timeout = setTimeout(() => doSearch(searchTerm.trim()), 300);
    } else {
      setProducts([]);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      controller.abort();
    };
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setIsDropdownOpen(term.length > 0);
  };

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
      return (
        <div className="absolute top-full right-0 left-0 z-50 mt-1 rounded-md border border-neutral-700 bg-neutral-800 p-4 shadow-lg">
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      );
    }

    if (!searchTerm) return null;

    const dropdownMessage = (() => {
      if (isLoading) {
        return 'Загрузка...';
      }
      if (!isSearchInit && prevIsLoading && products.length === 0) {
        return 'Товары не найдены';
      }
      return '';
    })();

    if (!dropdownMessage) return null;

    return (
      <div className="absolute top-full right-0 left-0 z-50 mt-1 rounded-md border border-neutral-700 bg-neutral-800 p-4 shadow-lg">
        <p className="text-sm text-gray-400">{dropdownMessage}</p>
      </div>
    );
  };

  return (
    <div {...rest} ref={searchRef} className={clsx('relative flex flex-1 shrink-0', className)}>
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

      {isDropdownOpen && products.length > 0 && (
        <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-96 overflow-y-auto rounded-md border border-neutral-700 bg-neutral-800 shadow-lg">
          {products.map((product) => (
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
                  <span className={`${audiowide.className} truncate text-sm text-red-400`}>
                    {product.title}
                  </span>
                  <span className="text-xs text-gray-400">{product.brand}</span>
                  <span className={`${audiowide.className} mt-1 text-sm text-red-300`}>
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
