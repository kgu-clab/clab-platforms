'use client';

import check from '@/public/lottie/working.json';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

export default function IntroduceLottie() {
  return (
    <Lottie
      className="hidden w-[400px] shrink-0 md:block"
      loop
      animationData={check}
      play
    />
  );
}
