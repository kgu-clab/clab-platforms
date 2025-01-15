import { Button } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import type { RecruitmentList } from '@/types';
import { toKoreanApplicationType } from '@/utils';
import Image from 'next/image';

interface Props {
  handleRecruitButtonClick: (id: number) => void;
  isError: boolean;
  recruitmentId: number;
  applicationTypeData: Array<RecruitmentList>;
}
export default function SelectApplicationType({
  handleRecruitButtonClick,
  isError,
  recruitmentId,
  applicationTypeData,
}: Props) {
  return (
    <div className="size-fit space-y-4">
      <div className="mb-8 flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-bold">합격 확인하기</h1>
        <Image src="/favicon.ico" alt="C-Lab" width={80} height={80} />
      </div>
      <hr />
      <p className="text-center text-sm">
        하단의 모집 단위 버튼을 클릭하셔야
        <span className="font-bold"> 합격 조회</span>가 가능해요.
        <br />
        지원하신 모집 단위를 선택해주세요.
      </p>
      <div className="border-clab-light-gray flex h-24 flex-wrap items-center justify-center rounded-md border p-4">
        {!isError && applicationTypeData.length > 0 ? (
          <div className="gap-2">
            {applicationTypeData.map(({ id, applicationType }) => {
              return (
                <Button
                  key={id}
                  size="sm"
                  className={cn(
                    'border-white bg-white bg-opacity-30 text-xs text-white hover:bg-none',
                    recruitmentId === id && 'bg-none',
                  )}
                  onClick={() => handleRecruitButtonClick(id)}
                >
                  {toKoreanApplicationType(applicationType)}
                </Button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm">합격 조회 기간이 아니에요.</p>
        )}
      </div>
    </div>
  );
}
