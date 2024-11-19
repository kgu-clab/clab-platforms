import '@clab-platforms/design-system/dist/index.css';

import { Providers } from '@/utils';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'C-Lab',
  description: '경기대학교 AI컴퓨터공학부 학술동아리 C-Lab입니다.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: JSX.Element | JSX.Element[];
}>) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
