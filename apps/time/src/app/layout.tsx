import '@clab-platforms/design-system/dist/index.css';
import { cn } from '@clab-platforms/utils';

import { Providers } from '@/shared/utils';
import type { Metadata } from 'next';

import './font.css';
import './globals.css';

export const metadata: Metadata = {
  title: '경기플러스',
  description: '경기대학교에 계신 모든 순간을 도와드릴게요.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn('flex min-h-screen flex-col bg-gray-50 font-sans')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
