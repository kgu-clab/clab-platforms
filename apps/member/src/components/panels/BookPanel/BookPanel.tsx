import Panel from '@components/common/Panel/Panel';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import { BookItem } from '@type/book';
import dayjs from 'dayjs';
import { FcBookmark } from 'react-icons/fc';

interface BookPanelProps {
  data: Array<BookItem>;
}

const ActionButton = ({ children }: { children: React.ReactNode }) => (
  <button className="py-1.5 hover:bg-gray-100 hover:text-black">
    {children}
  </button>
);

const checkProgress = (createdAt: string) => {
  const now = dayjs();
  const end = dayjs(createdAt).add(14, 'd');
  const value = (end.diff(now, 'd') * 100) % 14;
  console.log(value);
  return value;
};
const checkDueDate = (createdAt: string) => {
  const today = dayjs();
  const end = dayjs(createdAt).add(14, 'd');
  const value = end.diff(today, 'd');
  return value;
};

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
        {data.map(({ id, title, createdAt }) => (
          <ul key={id}>
            <li className="font-semibold">
              <div className="flex items-baseline justify-between mb-2">
                <span className="truncate mr-2">{title}</span>
                <span className="text-xs w-fit">
                  D-{checkDueDate(createdAt)}
                </span>
              </div>
              <ProgressBar value={checkProgress(createdAt)} />
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
