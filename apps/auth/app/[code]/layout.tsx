import Footer from '@components/common/Footer/Footer';
import HelpDesk from '@components/common/HelpDesk/HelpDesk';
import ServiceInformation from '@components/common/ServiceInformation/ServiceInformation';

import { ServiceCode } from '@utils/service';
import Image from 'next/image';

export type LoginStep = '로그인' | '2차인증' | '로그인성공';

export default function CodeLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { code: ServiceCode };
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-gray-50">
      <div className="flex w-full flex-col items-center gap-6 rounded-xl p-10 md:max-w-md md:border md:bg-white">
        <Image
          src="/logo.webp"
          alt="C-Lab"
          width={80}
          height={80}
          className="mx-auth"
          priority
        />
        <div className="text-center">
          <h1 className="text-2xl font-semibold">로그인</h1>
          <ServiceInformation code={params.code} />
        </div>
        {children}
        <HelpDesk />
      </div>
      <Footer />
    </main>
  );
}
