import { Button } from '@clab-platforms/design-system';

import {
  useBookLoanExtendMutation,
  useBookLoanRecordConditions,
  useBookLoanReturnMutation,
  useMyProfile,
} from '@hooks/queries';

interface MobileActionButtonsProps {
  bookDetailId: number;
}

const MobileActionButtons = ({ bookDetailId }: MobileActionButtonsProps) => {
  const { data: myProfile } = useMyProfile();
  const { data } = useBookLoanRecordConditions({
    borrowerId: myProfile.id,
  });
  const { bookReturnMutate } = useBookLoanReturnMutation();
  const { bookExtendMutate } = useBookLoanExtendMutation();

  const myBookLoan = data.items?.filter(
    (book) => book.status === 'APPROVED' && book.bookId === bookDetailId,
  );
  const isLoan = myBookLoan.length === 1;

  const handleBookReturnClick = () => {
    bookReturnMutate({
      bookId: bookDetailId,
      borrowerId: myProfile.id,
    });
  };
  const handleBookExtendClick = () => {
    bookExtendMutate({
      bookId: bookDetailId,
      borrowerId: myProfile.id,
    });
  };

  return (
    isLoan && (
      <div className="flex gap-2 lg:hidden">
        <Button
          className="py-1.5 hover:bg-gray-100 hover:text-black"
          onClick={handleBookExtendClick}
          disabled={!isLoan}
        >
          연장하기
        </Button>
        <Button
          className="py-1.5 hover:bg-gray-100 hover:text-black"
          onClick={handleBookReturnClick}
          disabled={!isLoan}
        >
          반납하기
        </Button>
      </div>
    )
  );
};

export default MobileActionButtons;
