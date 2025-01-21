import { toDecodeHTMLEntities } from '@clab-platforms/utils';

import { Section } from '@/components';
import { PATH } from '@/constants';
import { RECRUITMENT_DETAIL_TYPE } from '@/constants/recruitment';
import type { RecruitmentDetailItem } from '@/types';
import { formattedPeriod, toKoreaISOString } from '@/utils';
import Link from 'next/link';

import { Content } from '../components';

interface DetailSectionProps {
  detailData: RecruitmentDetailItem;
}

export default function DetailSection({ detailData }: DetailSectionProps) {
  return (
    <Section className="my-24 justify-center space-y-16 text-left">
      <h1 className="text-clab-light-blue text-6xl font-bold">
        {toDecodeHTMLEntities(detailData.title)}
      </h1>
      <div className="grid grid-cols-2 gap-12">
        <Content
          title={RECRUITMENT_DETAIL_TYPE[0]}
          detail={toDecodeHTMLEntities(detailData.teamIntroduction)}
          className="col-span-2"
        />
        <div className="space-y-8">
          <Content
            title={RECRUITMENT_DETAIL_TYPE[1]}
            detail={formattedPeriod(
              toKoreaISOString(detailData.startDate),
              toKoreaISOString(detailData.endDate),
            )}
          />
          <Content
            title={RECRUITMENT_DETAIL_TYPE[3]}
            detail={toDecodeHTMLEntities(detailData.target)}
          />
        </div>
        <Content
          title={RECRUITMENT_DETAIL_TYPE[2]}
          detail={toDecodeHTMLEntities(detailData.processTimeline)}
        />
        <Content
          title={RECRUITMENT_DETAIL_TYPE[4]}
          detail={toDecodeHTMLEntities(detailData.jobDescription)}
          className="col-span-2"
        />
      </div>
      {detailData.status !== '종료' && (
        <div className="flex justify-start space-x-4">
          <Link
            className="bg-clab-yellow border-clab-yellow text-clab-yellow rounded-full border bg-opacity-30 px-8 py-2 text-lg font-bold hover:bg-opacity-0"
            href={PATH.ASK}
          >
            문의하러 가기
          </Link>
          <Link
            className="bg-clab-yellow border-clab-yellow text-clab-yellow rounded-full border bg-opacity-30 px-8 py-2 text-lg font-bold hover:bg-opacity-0"
            href={PATH.APPLICATION_FORM}
          >
            지원서 작성하기
          </Link>
        </div>
      )}
    </Section>
  );
}
