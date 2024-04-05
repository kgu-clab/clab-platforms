import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { cn } from '@utils/component';
import './globals.css';

const inter = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '경기타임',
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
      <body
        className={cn(inter.className, 'bg-gray-50 min-h-screen flex flex-col')}
      >
        {children}
      </body>
    </html>
  );
}
