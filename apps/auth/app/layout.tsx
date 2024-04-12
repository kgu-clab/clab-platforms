import QueryClientProvider from '@components/common/QueryClientProvider/QueryClientProvider';
import RecoilProvider from '@components/common/RecoilProvider/RecoilProvider';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'C-Lab Auth',
  description: 'C-Lab Login System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <QueryClientProvider>
          <RecoilProvider>{children}</RecoilProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
