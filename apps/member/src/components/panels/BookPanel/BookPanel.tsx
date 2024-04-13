import { FcBookmark } from 'react-icons/fc';

import Panel from '@components/common/Panel/Panel';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import Select from '@components/common/Select/Select';

import useModal from '@hooks/common/useModal';
import { useBookLoanRecordConditions } from '@hooks/queries';
import { useBookLoanExtendMutation } from '@hooks/queries/useBookLoanExtendMutation';
import { useBookLoanReturnMutation } from '@hooks/queries/useBookLoanReturnMutation';
import { checkDueDate, checkExtendProgress } from '@utils/date';

import { BookItem } from '@type/book';

interface BookPanelProps {
  memberId: string;
  data: BookItem[];
}

type BookPanelActionType = '반납하기' | '연장하기';

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

const BookPanel = ({ memberId, data }: BookPanelProps) => {
  const { openModal } = useModal();

  const { data: myLoanBookData } = useBookLoanRecordConditions({
    borrowerId: memberId,
  });
  const { bookReturnMutate } = useBookLoanReturnMutation();
  const { bookExtendMutate } = useBookLoanExtendMutation();

  const selectOptions = data.map(({ title, id }) => ({
    name: title,
    value: id,
  }));

  const myLoanSelectData =
    myLoanBookData.items?.filter((id) => id.returnedAt === null) || [];

  const onClickBookButton = (title: BookPanelActionType) => {
    let selectedBookId = selectOptions[0].value; // 기본값으로 첫 번째 책 선택

    openModal({
      title,
      content: (
        <Select
          className="w-full"
          options={selectOptions}
          onChange={(e) => (selectedBookId = Number(e.target.value))}
        />
      ),
      accept: {
        text: title,
        onClick: () => {
          if (title === '반납하기') {
            // 반납하기
            bookReturnMutate({
              borrowerId: memberId,
              bookId: selectedBookId,
            });
          } else {
            // 연장하기
            bookExtendMutate({
              bookId: selectedBookId,
              borrowerId: memberId,
            });
          }
        },
      },
    });
  };

  return (
    <Panel>
      <Panel.Header
        icon={<FcBookmark />}
        label="도서"
        description={
          data.length > 0 ? `${data.length}권 대여중` : '빌린 도서가 없어요.'
        }
      />
      <Panel.Body className="space-y-4 text-sm">
        {data.length > 0 ? (
          data.map(({ id, title }) => {
            const loanData = myLoanSelectData.find(
              (book) => book.bookId === id,
            );
            if (!loanData) return null;

            return (
              <ul key={id}>
                <li className="font-semibold">
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="mr-2 truncate">{title}</span>
                    <span className="w-fit text-nowrap text-xs">
                      D-
                      {checkDueDate(loanData.borrowedAt!, loanData.dueDate!)}
                    </span>
                  </div>
                  <ProgressBar
                    value={checkExtendProgress(
                      loanData.borrowedAt!,
                      loanData.dueDate!,
                    )}
                  />
                </li>
              </ul>
            );
          })
        ) : (
          <p className="rounded-lg bg-gray-100 py-1.5 text-center text-xs">
            언제든지 도서관에서 도서를 대여할 수 있어요.
          </p>
        )}
      </Panel.Body>
      {data.length > 0 && (
        <Panel.Action>
          <ActionButton onClick={() => onClickBookButton('연장하기')}>
            연장하기
          </ActionButton>
          <ActionButton onClick={() => onClickBookButton('반납하기')}>
            반납하기
          </ActionButton>
        </Panel.Action>
      )}
    </Panel>
  );
};

export default BookPanel;
