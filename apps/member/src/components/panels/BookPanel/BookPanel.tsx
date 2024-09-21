import { BookmarkColor } from '@clab-platforms/icon';

import Panel from '@components/common/Panel/Panel';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import Select from '@components/common/Select/Select';

import { useModal } from '@hooks/common/useModal';
import {
  useBookLoanExtendMutation,
  useBookLoanRecordConditions,
  useBookLoanReturnMutation,
  useMyProfile,
} from '@hooks/queries';
import { checkDueDate, checkExtendProgress } from '@utils/date';

type Action = '반납하기' | '연장하기';

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

const BookPanel = () => {
  const { open } = useModal();

  const { data: myProfile } = useMyProfile();
  const { data } = useBookLoanRecordConditions({
    borrowerId: myProfile.id,
  });
  const { bookReturnMutate } = useBookLoanReturnMutation();
  const { bookExtendMutate } = useBookLoanExtendMutation();

  const myBookLoan =
    data.items?.filter((book) => book.status === 'APPROVED') || [];
  const hasBookLoan = myBookLoan.length > 0;

  const selectOptions = myBookLoan.map(({ bookId, bookTitle }) => ({
    name: bookTitle,
    value: bookId,
  }));

  const handleActionClick = (action: Action) => {
    let selectedBookId = selectOptions[0].value; // 기본값으로 첫 번째 책 선택

    open({
      title: action,
      content: (
        <Select
          className="w-full"
          options={selectOptions}
          onChange={(e) => (selectedBookId = Number(e.target.value))}
        />
      ),
      accept: {
        text: action,
        onClick: () => {
          if (action === '반납하기') {
            // 반납하기
            bookReturnMutate({
              bookId: selectedBookId,
              borrowerId: myProfile.id,
            });
          } else {
            // 연장하기
            bookExtendMutate({
              bookId: selectedBookId,
              borrowerId: myProfile.id,
            });
          }
        },
      },
    });
  };

  return (
    <Panel>
      <Panel.Header
        icon={<BookmarkColor />}
        label="도서"
        description={
          hasBookLoan ? `${myBookLoan.length}권 대여중` : '빌린 도서가 없어요.'
        }
      />
      <Panel.Body className="space-y-4 text-sm">
        {hasBookLoan ? (
          myBookLoan.map(({ bookId, bookTitle, borrowedAt, dueDate }) => {
            return (
              <ul key={bookId}>
                <li className="font-semibold">
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="mr-2 truncate">{bookTitle}</span>
                    <span className="w-fit text-nowrap text-xs">
                      D-
                      {checkDueDate(borrowedAt!, dueDate!)}
                    </span>
                  </div>
                  <ProgressBar
                    value={checkExtendProgress(borrowedAt!, dueDate!)}
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
      {hasBookLoan && (
        <Panel.Action>
          <ActionButton onClick={() => handleActionClick('연장하기')}>
            연장하기
          </ActionButton>
          <ActionButton onClick={() => handleActionClick('반납하기')}>
            반납하기
          </ActionButton>
        </Panel.Action>
      )}
    </Panel>
  );
};

export default BookPanel;
