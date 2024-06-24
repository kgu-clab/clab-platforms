'use client';

import Lottie from 'react-lottie-player';

import inspectionLottieJson from '@/public/lottie/inspection.json';

export default function InspectionLottie() {
  return (
    <Lottie
      className="hidden w-[400px] shrink-0 md:block"
      loop
      animationData={inspectionLottieJson}
      play
    />
  );
}
