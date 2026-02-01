import LoginForm from '@/app/ui/login-form';
import Link from 'next/link';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen bg-neutral-800">
      <div className="relative mx-auto flex w-full max-w-[400px] bg-neutral-700 flex-col space-y-2.5 p-4 md:-mt-32 rounded-md">
        <div className="flex h-20 w-full items-center justify-center rounded-lg p-3 md:h-36">
          <Link href="/">
            <span className='text-4xl text-red-400 text-shadow-pink-600'>
              完了
            </span>
          </Link>
        </div>
        <Suspense fallback="Загрузка...">
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
