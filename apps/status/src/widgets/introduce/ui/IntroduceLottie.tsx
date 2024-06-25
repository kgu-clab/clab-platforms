'use client';

import Lottie from 'react-lottie-player';

import check from '@/public/lottie/working.json';

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
