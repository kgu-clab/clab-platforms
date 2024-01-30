import Information from '@components/Information/Information';
import LoginFrom from '@components/LoginFrom/LoginFrom';
import Footer from '@components/common/Footer/Footer';
import HelpLink from '@components/common/HelpLink/HelpLink';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-gray-50">
      <div className="flex w-full flex-col items-center gap-6 rounded-xl p-10 md:max-w-md md:border md:bg-white">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="C-Lab"
            width={80}
            height={80}
            className="mb-6"
            priority
          />
          <h1 className="text-2xl font-semibold">로그인</h1>
          <Information />
        </div>
        <LoginFrom />
        <HelpLink />
      </div>
      <Footer />
    </main>
  );
}
