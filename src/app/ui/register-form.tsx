'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/src/app/ui/button';
import { useActionState, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { register } from '@/src/app/actions/auth';

export default function RegisterForm() {
  const [actionState, formAction, isPending] = useActionState(
    register,
    undefined,
  );
  const [localError, setLocalError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get('from');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget as HTMLFormElement;
    const pwd = (
      form.querySelector('input[name="password"]') as HTMLInputElement
    )?.value;
    const confirm = (
      form.querySelector('input[name="confirmPassword"]') as HTMLInputElement
    )?.value;
    if (pwd !== confirm) {
      event.preventDefault();
      setLocalError('Пароли не совпадают');
      return;
    }
    setLocalError(null);
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-200 px-6 pt-8 pb-4">
        <div className="w-full">
          <div>
            <label
              className="mt-5 mb-3 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Имя
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm text-gray-900 outline-2 placeholder:text-gray-500"
              id="name"
              type="text"
              name="name"
              placeholder="Введите имя"
              required
              minLength={2}
              defaultValue={actionState?.formState?.get('name') as string || ''}
              disabled={isPending}
            />
          </div>
          <div>
            <label
              className="mt-5 mb-3 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-gray-900 outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Введите email"
                required
                defaultValue={actionState?.formState?.get('email') as string || ''}
                disabled={isPending}
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
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-gray-900 outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Введите пароль"
                required
                minLength={6}
                defaultValue={actionState?.formState?.get('password') as string || ''}
                disabled={isPending}
              />
              <KeyIcon className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mt-5 mb-3 block text-xs font-medium text-gray-900"
              htmlFor="confirmPassword"
            >
              Подтвердите пароль
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-gray-900 outline-2 placeholder:text-gray-500"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Повторите пароль"
                required
                minLength={6}
                defaultValue={actionState?.formState?.get('confirmPassword') as string || ''}
                disabled={isPending}
              />
              <KeyIcon className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <input
          type="hidden"
          name="redirectUrl"
          defaultValue={(fromUrl && `${fromUrl}?from=/login`) || actionState?.formState?.get('redirectUrl') as string || ''}
        />
        <Button
          className="mt-4 w-full hover:cursor-pointer"
          aria-disabled={isPending}
        >
          Зарегистрироваться
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1 min-h-max"
          aria-live="polite"
          aria-atomic="true"
        >
          {(actionState?.error || localError) && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">
                {localError ?? actionState?.error}
              </p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
