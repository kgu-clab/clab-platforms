import Image from '@components/common/Image/Image';
import Section from '@components/common/Section/Section';
import type { ActivityGroupBoardParserType } from '@type/activity';
import { getDateSemester } from '@utils/date';
import { LiaCertificateSolid } from 'react-icons/lia';
import { MdOutlineDateRange } from 'react-icons/md';
import { PiStudent } from 'react-icons/pi';
interface ActivityDetailSectionProps {
  data: ActivityGroupBoardParserType;
}

const ActivityDetailSection = ({ data }: ActivityDetailSectionProps) => {
  return (
    <div className="space-y-4">
      <Image
        width="w-full"
        height="h-[300px]"
        src={data.imageUrl}
        alt={data.name}
        className="object-cover border rounded-lg"
      />
      <Section>
        <h1 className="text-xl font-bold">{data.name}</h1>
        <p className="my-1 text-sm">{data.content}</p>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <LiaCertificateSolid />
          <span>{data.category}</span>
          <span>•</span>
          <MdOutlineDateRange />
          <span>{getDateSemester(data.createdAt)}</span>
          <span>•</span>
          <PiStudent />
          <span>{data.subject}</span>
        </div>
      </Section>
    </div>
  );
};

export default ActivityDetailSection;
