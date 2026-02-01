'use client';

import { audiowide } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authenticate } from '@/app/actions/auth';

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get('from');

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/auth/check');
      if (res.ok) {
        if (fromUrl) {
          router.push(fromUrl)
        } else {
          router.push('/');
        }
      }
      setIsAuthChecked(true);
    };
    checkAuth();
  }, [router]);

  if (!isAuthChecked) {
    return (
      <span className='text-white text-lg'>
        Загрузка...
      </span>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-200 px-6 pt-8 pb-4">
        <h1 className={`${audiowide.className} mb-3 text-2xl`}>
          Войдите в систему или зарегистрируйтесь.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mt-5 mb-3 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 text-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Введите email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mt-5 mb-3 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Пароль
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 text-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Введите пароль"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectUrl" value={`${fromUrl}?from=/login` || '/'} />
        <Button className="mt-4 w-full hover:cursor-pointer" aria-disabled={isPending}>
          Войти <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
