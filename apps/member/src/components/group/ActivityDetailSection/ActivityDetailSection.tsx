import {
  CertificateSolidOutline,
  DateRangeOutline,
  StudentOutline,
} from '@clab-platforms/icon';

import Image from '@components/common/Image/Image';
import Section from '@components/common/Section/Section';

import { getDateSemester } from '@utils/date';

import type { ActivityGroupBoardParserType } from '@type/activity';

interface ActivityDetailSectionProps {
  data: ActivityGroupBoardParserType;
}

const ActivityDetailSection = ({ data }: ActivityDetailSectionProps) => {
  return (
    <div className="space-y-4">
      <Image
        width="w-full"
        height="h-[320px]"
        src={data.imageUrl}
        alt={data.name}
        className="rounded-lg border object-cover"
      />
      <Section className="flex h-[160px] flex-col justify-between overflow-scroll">
        <h1 className="text-xl font-bold">{data.name}</h1>
        <p className="my-1 whitespace-pre-line text-sm ">{data.content}</p>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <CertificateSolidOutline />
          <span>{data.category}</span>
          <span>•</span>
          <DateRangeOutline />
          <span>{getDateSemester(data.createdAt)}</span>
          <span>•</span>
          <StudentOutline />
          <span>{data.subject}</span>
        </div>
      </Section>
    </div>
  );
};

export default ActivityDetailSection;
