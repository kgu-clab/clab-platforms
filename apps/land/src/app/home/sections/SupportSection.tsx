import { CheckmarkSolid } from '@clab-platforms/icon';

import { Section } from '@/components';
import { SUPPORT } from '@/constants';

export default function SupportSection() {
  return (
    <Section>
      <div className="mb-24 flex flex-col space-y-2 md:text-center">
        <h2 className="text-4xl font-bold md:text-6xl">SUPPORT</h2>
        <p className="text-xl md:text-3xl">
          구성원의 발전을 C-Lab이
          <span className="text-clab-yellow"> 지원</span>해요.
        </p>
      </div>
      <div className="w-2/3 space-y-8 md:w-1/3">
        {SUPPORT.map(({ title, detail }, index) => (
          <div key={index} className="group flex">
            <CheckmarkSolid width={28} height={28} />
            <div>
              <p className="group-hover:text-clab-yellow ml-6 text-2xl transition group-hover:scale-105 group-hover:underline group-hover:underline-offset-8">
                {title}
              </p>
              <p className="h-0 translate-y-0 text-xl opacity-0 transition-all duration-500 ease-in-out group-hover:h-fit group-hover:translate-y-4 group-hover:opacity-100">
                {detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
