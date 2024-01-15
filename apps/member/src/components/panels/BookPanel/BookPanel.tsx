import Panel from '@components/common/Panel/Panel';
import { FcBookmark } from 'react-icons/fc';

interface BookPanelProps {
  data: {
    id: number;
    title: string;
  }[];
}

const BookPanel = ({ data }: BookPanelProps) => {
  const description =
    data.length > 0 ? `${data.length}권 대여중` : '빌린 도서가 없어요.';
  return (
    <Panel
      label="도서"
      description={description}
      icon={<FcBookmark />}
      action={[
        <button className="py-1.5 hover:bg-gray-100 hover:text-black">
          대출하기
        </button>,
        <button className="py-1.5 hover:bg-gray-100 hover:text-black">
          반납하기
        </button>
      ]}>
      <div className="space-y-4 text-sm">
        {data.map(({ id, title }) => (
          <ul key={id}>
            <li className="font-bold">
              <div className="flex items-baseline justify-between">
                <span>{title}</span>
                <span className="text-xs">D-10</span>
              </div>
              <progress
                className="progress w-full"
                value="40"
                max="100"></progress>
            </li>
          </ul>
        ))}
      </div>
    </Panel>
  );
};

export default BookPanel;
