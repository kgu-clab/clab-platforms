import { Footer, Header } from '@/src/widgets/menu';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'C-LAB Status',
  description: 'C-LAB 서비스들의 상태를 한눈에 확인해보세요',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-w-dvw relative flex min-h-dvh flex-col items-center justify-center bg-white">
        <div className="xs:p-10 mb-20 flex w-full max-w-5xl flex-col justify-center gap-y-20 p-5">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
