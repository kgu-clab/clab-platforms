import Panel from '@components/common/Panel/Panel';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import { BookItem } from '@type/book';
import { FcBookmark } from 'react-icons/fc';
import dayjs from 'dayjs';
import useModal from '@hooks/common/useModal';
import { useBookLoanReturnMutation } from '@hooks/queries/useBookLoanReturnMutation';
import { useState } from 'react';
import { useBookLoanExtendMutation } from '@hooks/queries/useBookLoanExtendMutation';

interface BookPanelProps {
  memberId: string;
  data: Array<BookItem>;
}

const ActionButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    className="py-1.5 hover:bg-gray-100 hover:text-black"
    onClick={onClick}
  >
    {children}
  </button>
);

const checkProgress = (createdAt: string) => {
  const now = dayjs();
  const end = dayjs(createdAt).add(14, 'd');
  return (end.diff(now, 'd') * 100) % 14;
};

const checkDueDate = (createdAt: string) => {
  const today = dayjs();
  const end = dayjs(createdAt).add(14, 'd');
  return end.diff(today, 'd');
};

const BookPanel = ({ data, memberId }: BookPanelProps) => {
  const { openModal } = useModal();
  const { bookReturnMutate } = useBookLoanReturnMutation();
  const { bookExtendMutate } = useBookLoanExtendMutation();
  const description =
    data.length > 0 ? `${data.length}권 대여중` : '빌린 도서가 없어요.';
  const [selectedBookId, setSelectedBookId] = useState<number>(0);

  const onClickBookButton = (sort: string) => {
    openModal({
      title: sort === 'return' ? '반납하기' : '연장하기',
      content: (
        <select
          className="p-2 border rounded-md"
          onChange={(e) => setSelectedBookId(Number(e.target.value))}
        >
          <option disabled value={0}>
            미선택
          </option>
          {data.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
      ),
      accept: {
        text: sort === 'return' ? '반납하기' : '연장하기',
        onClick: () => {
          sort === 'return'
            ? bookReturnMutate({
                bookId: selectedBookId,
                borrowerId: memberId,
              })
            : bookExtendMutate({
                bookId: selectedBookId,
                borrowerId: memberId,
              });
        },
      },
    });
  };

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
                <span className="mr-2 truncate">{title}</span>
                <span className="text-xs w-fit text-nowrap">
                  D-{checkDueDate(createdAt)}
                </span>
              </div>
              <ProgressBar value={checkProgress(createdAt)} />
            </li>
          </ul>
        ))}
      </Panel.Body>
      <Panel.Action>
        <ActionButton onClick={() => onClickBookButton('extend')}>
          연장하기
        </ActionButton>
        <ActionButton onClick={() => onClickBookButton('return')}>
          반납하기
        </ActionButton>
      </Panel.Action>
    </Panel>
  );
};

export default BookPanel;
