import LoginForm from '@components/LoginForm/LoginForm';
import ServiceInformation from '@components/ServiceInformation/ServiceInformation';
import Footer from '@components/common/Footer/Footer';
import HelpDesk from '@components/common/HelpDesk/HelpDesk';

import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-gray-50">
      <div className="flex w-full flex-col items-center gap-6 rounded-xl p-10 md:max-w-md md:border md:bg-white">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.webp"
            alt="C-Lab"
            width={80}
            height={80}
            className="mb-6"
            priority
          />
          <h1 className="text-2xl font-semibold">로그인</h1>
          <ServiceInformation />
        </div>
        <LoginForm />
        <HelpDesk />
      </div>
      <Footer />
    </main>
  );
}
