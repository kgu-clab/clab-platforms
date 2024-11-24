import PageLayout from '@/app/PageLayout';
import { KEYWORDS, PATH } from '@/constants';
import Link from 'next/link';

import TextSlider from './components/TextSlider';

export default function Home() {
  return (
    <PageLayout nav footer className="h-screen w-full">
      <div className="flex size-full flex-col items-center justify-between overflow-hidden">
        <TextSlider keywords={KEYWORDS} direction="right" />
        <div className="flex flex-col space-y-4 text-center">
          <h1 className="text-4xl font-bold leading-normal md:text-6xl md:leading-normal">
            당신의 가치를 찾기 위한 여정
            <br />
            여기 C-Lab에서.
          </h1>
          <Link
            href={PATH.APPLICATION}
            className="bg-clab-yellow border-clab-yellow hover:text-clab-yellow mx-auto rounded-full border px-10 py-2 text-xl font-bold text-black hover:bg-opacity-0"
          >
            JOIN-US
          </Link>
        </div>
        <TextSlider keywords={[...KEYWORDS].reverse()} direction="left" />
      </div>
    </PageLayout>
  );
}
