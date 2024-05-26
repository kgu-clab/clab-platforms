import Footer from '@components/common/Footer/Footer';
import HelpDesk from '@components/common/HelpDesk/HelpDesk';

import Image from 'next/image';

export default function NotFoundPage() {
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
          <p className="text-red-500">해당 서비스를 찾을 수 없습니다.</p>
        </div>
        <HelpDesk />
      </div>
      <Footer />
    </main>
  );
}
