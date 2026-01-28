import type { Metadata } from "next";
import "./globals.css";
import { permanentMarker } from '@/app/ui/fonts';
import Header from '@/app/ui/header';

export const metadata: Metadata = {
  title: {
    template: '%s | Kanryo',
    default: 'Kanryo',
  },
  description: 'Kanryo description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${permanentMarker.className} antialiased`}
      >
        <div className="min-h-screen bg-neutral-800">
          <main className="flex min-h-screen min-w-full lg:min-w-7xl flex-col items-center text-red-400">
            <Header />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
