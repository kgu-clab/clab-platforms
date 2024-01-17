import Panel from '@components/common/Panel/Panel';
import { FcBookmark } from 'react-icons/fc';

interface BookPanelProps {
  data: {
    id: number;
    title: string;
  }[];
}

const ActionButton = ({ children }: { children: React.ReactNode }) => (
  <button className="py-1.5 hover:bg-gray-100 hover:text-black">
    {children}
  </button>
);

const BookPanel = ({ data }: BookPanelProps) => {
  const description =
    data.length > 0 ? `${data.length}권 대여중` : '빌린 도서가 없어요.';

  return (
    <Panel>
      <Panel.Header
        icon={<FcBookmark />}
        label="도서"
        description={description}
      />
      <Panel.Body className="space-y-4 text-sm">
        {data.map(({ id, title }) => (
          <ul key={id}>
            <li className="font-bold">
              <div className="flex items-baseline justify-between">
                <span>{title}</span>
                <span className="text-xs">D-10</span>
              </div>
              <progress className="w-full" value="20" max="100"></progress>
            </li>
          </ul>
        ))}
      </Panel.Body>
      <Panel.Action>
        <ActionButton>대여하기</ActionButton>
        <ActionButton>반납하기</ActionButton>
      </Panel.Action>
    </Panel>
  );
};

export default BookPanel;
