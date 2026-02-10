import Link from 'next/link';
import { Button } from '@/ui/button';
import { audiowide } from '@/ui/fonts';

export default function Notfo() {
  return (
    <div className="max-w-7xl w-full bg-neutral-900 grow flex items-center justify-center">
      <div className="flex flex-col -mt-[50%] items-center">
        <span className={`${audiowide.className} w-max truncate text-2xl`}>
          404 Извините, ничего не найдено
        </span>
        <Link href="/" className="w-max">
          <Button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-400 hover:cursor-pointer mt-2">
            Вернуться на главную
          </Button>
        </Link>
      </div>
    </div>
  );
}
