import '@clab-platforms/design-system/dist/index.css';

import { ChannelTalkProvider, Providers, ToastProvider } from '@/utils';
import type { Metadata } from 'next';

import './fonts.css';
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
      <body className="scrollbar-hide flex min-h-screen flex-col">
        <Providers>
          <ToastProvider />
          <ChannelTalkProvider>{children}</ChannelTalkProvider>
        </Providers>
      </body>
    </html>
  );
}
