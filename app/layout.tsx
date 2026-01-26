import type { Metadata } from "next";
import "./globals.css";
import { permanentMarker } from '@/app/ui/fonts';

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
        {children}
      </body>
    </html>
  );
}
