import Section from '@components/common/Section/Section';

interface NoticeDetailSectionProps {
  manager: string;
  data: {
    id: number;
    title: string;
    date: string;
    content: string;
  };
}

const NoticeDetailSection = ({ manager, data }: NoticeDetailSectionProps) => {
  return (
    <Section>
      <div className="rounded-t-md border-2 bg-zinc-100 p-3 text-center">
        <h1 className="font-bold text-lg">{data.title}</h1>
      </div>
      <div className="flex justify-between border-b-2 px-5 py-3">
        <p>작성자 : {manager}</p>
        <p>작성일 : {data.date}</p>
      </div>
      <div className="h-auto p-5">{data.content}</div>
    </Section>
  );
};

export default NoticeDetailSection;
