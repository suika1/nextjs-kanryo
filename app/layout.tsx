import type { Metadata } from 'next';
import './globals.css';
import { permanentMarker } from '@/app/ui/fonts';
import Header from '@/app/ui/header';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Providers from './providers';

export const metadata: Metadata = {
  title: {
    template: '%s | Kanryo',
    default: 'Kanryo',
  },
  description: 'Kanryo description',
};
const isDev = process.env.NODE_ENV === 'development';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${permanentMarker.className} antialiased`}>
        <div className="min-h-screen bg-neutral-800">
          <main className="flex min-h-screen min-w-full flex-col items-center text-red-400 lg:min-w-7xl">
            <Providers>
              <Header />
              {children}
              {!isDev && (
                <>
                  <Analytics />
                  <SpeedInsights />
                </>
              )}
            </Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
