import Panel from '@components/common/Panel/Panel';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import { BookItem } from '@type/book';
import { FcBookmark } from 'react-icons/fc';
import dayjs from 'dayjs';
import useModal from '@hooks/common/useModal';
import { useBookLoanReturnMutation } from '@hooks/queries/useBookLoanReturnMutation';
import { useBookLoanExtendMutation } from '@hooks/queries/useBookLoanExtendMutation';
import Select from '@components/common/Select/Select';
import { useBookLoanRecordByMemberId } from '@hooks/queries/useBookLoanRecordById';
import useToast from '@hooks/common/useToast';

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

const checkProgress = (date: string) => {
  const now = dayjs();
  const end = dayjs(date).add(14, 'd');
  return (end.diff(now, 'd') * 100) % 14;
};

const checkExtendProgress = (startDate: string, endDate: string) => {
  const now = dayjs();
  const end = dayjs(endDate);
  const start = dayjs(startDate);
  const gap = end.diff(start, 'd');
  return (end.diff(now, 'd') * 100) % gap;
};

const checkDueDate = (date: string) => {
  const today = dayjs();
  const end = dayjs(date).add(14, 'd');
  return end.diff(today, 'd');
};

const BookPanel = ({ data, memberId }: BookPanelProps) => {
  const today = dayjs();
  const { openModal } = useModal();
  const toast = useToast();
  const { data: myLoanBookData } = useBookLoanRecordByMemberId(memberId);
  const { bookReturnMutate } = useBookLoanReturnMutation();
  const { bookExtendMutate } = useBookLoanExtendMutation();
  const selectData = data.map(({ id, title }) => ({ id, name: title }));
  const myLoanSelectData = myLoanBookData.items.filter(
    (id) => id.returnedAt === null,
  );
  const description =
    data.length > 0 ? `${data.length}권 대여중` : '빌린 도서가 없어요.';

  const onClickBookButton = (sort: string) => {
    let selectedBookId = selectData[0].id;
    if (myLoanSelectData.length === 0) {
      toast({
        state: 'error',
        message: '대여된 도서가 없습니다.',
      });
      return;
    }
    openModal({
      title: sort === 'return' ? '반납하기' : '연장하기',
      content: (
        <Select
          data={selectData}
          onChange={(e) => (selectedBookId = Number(e.target.value))}
        />
      ),
      accept: {
        text: sort === 'return' ? '반납하기' : '연장하기',
        onClick: () => {
          console.log(selectedBookId);
          if (selectedBookId >= 0) {
            sort === 'return'
              ? bookReturnMutate({
                  bookId: selectedBookId,
                  borrowerId: memberId,
                })
              : bookExtendMutate({
                  bookId: selectedBookId,
                  borrowerId: memberId,
                });
            selectedBookId = selectData[0].id;
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
        description={description}
      />
      <Panel.Body className="space-y-4 text-sm">
        {data.map(({ id, title }) => {
          const loanData = myLoanSelectData.find((book) => book.bookId === id);
          if (!loanData) return null;

          return (
            <ul key={id}>
              <li className="font-semibold">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="mr-2 truncate">{title}</span>
                  <span className="text-xs w-fit text-nowrap">
                    D-
                    {loanData.loanExtensionDate
                      ? dayjs(loanData.loanExtensionDate).diff(today, 'd')
                      : loanData.borrowedAt
                        ? checkDueDate(loanData.borrowedAt)
                        : 0}
                  </span>
                </div>
                <ProgressBar
                  value={
                    loanData.loanExtensionDate && loanData.borrowedAt
                      ? checkExtendProgress(
                          loanData.borrowedAt,
                          loanData.loanExtensionDate,
                        )
                      : loanData.borrowedAt
                        ? checkProgress(loanData.borrowedAt)
                        : 0
                  }
                />
              </li>
            </ul>
          );
        })}
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
