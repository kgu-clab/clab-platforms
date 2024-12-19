import { Section } from '@/components';
import { PATH } from '@/constants';
import Link from 'next/link';

export default function RecruitmentSection() {
  return (
    <Section className="relative text-center">
      <div
        className="absolute inset-0 h-screen w-screen bg-[url('/clab_picture.jpeg')] bg-cover bg-center opacity-40"
        style={{
          boxShadow: 'inset 0 0 150px rgba(0, 0, 0, 0.5)',
        }}
      />
      <div className="z-5 relative">
        <p className="mb-4 px-16 text-4xl font-bold leading-normal md:text-6xl md:leading-normal">
          C-Lab과 함께라면
          <span className="text-clab-yellow"> 두려울 게 없는 여정</span>
        </p>
        <p className="mb-12 text-center text-xl font-bold leading-normal md:text-2xl">
          지금은 모집기간이 아니에요. <br />
          3월, 새로운 시작과 함께 만나요!
        </p>
        <Link
          href={PATH.APPLICATION}
          className="bg-clab-yellow border-clab-yellow hover:text-clab-yellow mx-auto rounded-full border px-10 py-4 text-xl font-bold text-black hover:bg-opacity-0"
        >
          이전 모집글 확인하기
        </Link>
      </div>
    </Section>
  );
}
