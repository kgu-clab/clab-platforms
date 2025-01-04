import { Section } from '@/components';
import { PATH } from '@/constants';
import Link from 'next/link';

export default function RecruitmentSection() {
  return (
    <Section className="relative text-center">
      <div
        className="absolute inset-0 h-screen w-screen bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), ' +
            "url('/clab_picture.jpeg')",
        }}
      />
      <div className="z-5 relative">
        <p className="mb-4 px-16 text-4xl font-bold leading-normal md:text-6xl md:leading-normal">
          C-Lab과 함께라면
          <span className="text-clab-light-blue"> 두려울 게 없는 여정</span>
        </p>
        <p className="mb-12 text-center text-xl font-bold leading-normal md:text-2xl">
          지금은 모집기간이 아니에요. <br />
          3월, 새로운 시작과 함께 만나요!
        </p>
        <Link
          href={PATH.APPLY}
          className="bg-clab-light-blue border-clab-light-blue hover:text-clab-light-blue mx-auto rounded-full border px-10 py-4 text-xl font-bold text-black hover:bg-opacity-0"
        >
          이전 모집글 확인하기
        </Link>
      </div>
    </Section>
  );
}
