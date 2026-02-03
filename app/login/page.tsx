'use client';

import { useState, Suspense } from 'react';
import LoginForm from '@/app/ui/login-form';
import RegisterForm from '@/app/ui/register-form';
import Link from 'next/link';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <main className="flex items-center justify-center md:h-screen bg-neutral-800">
      <div className="relative mx-auto flex w-100 bg-neutral-700 flex-col space-y-2.5 p-4 md:-mt-32 rounded-md">
        <div className="flex h-20 w-full items-center justify-center rounded-lg p-3 md:h-36">
          <Link href="/">
            <span className='text-4xl text-red-400 text-shadow-pink-600'>
              完了
            </span>
          </Link>
        </div>
        <Suspense fallback="Загрузка...">
          {mode === 'login' ? <LoginForm /> : <RegisterForm />}
        </Suspense>

        <div className="flex items-center justify-center py-2">
          {mode === 'login' ? (
            <button
              type="button"
              className="text-sm text-blue-300 hover:underline hover:cursor-pointer"
              onClick={() => setMode('register')}
            >
              Зарегистрироваться
            </button>
          ) : (
            <button
              type="button"
              className="text-sm text-blue-300 hover:underline hover:cursor-pointer"
              onClick={() => setMode('login')}
            >
              Войти
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
