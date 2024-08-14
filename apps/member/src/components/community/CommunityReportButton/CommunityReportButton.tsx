import { Button } from '@clab-platforms/design-system';

import { MODAL_ACCEPT, MODAL_CONTENT, MODAL_TITLE } from '@constants/modal';
import useModal from '@hooks/common/useModal';
import { useAccusesMutation } from '@hooks/queries';

interface CommunityReportButtonProps {
  id: number;
}

const CommunityReportButton = ({ id }: CommunityReportButtonProps) => {
  const { accusesMutate } = useAccusesMutation();
  const { openModal } = useModal();

  const handleAccusesClick = () => {
    openModal({
      title: MODAL_TITLE.REPORT,
      content: MODAL_CONTENT.REPORT,
      accept: {
        text: MODAL_ACCEPT.REPORT,
        onClick: () => {
          accusesMutate({
            targetType: 'BOARD',
            targetId: id,
            reason: '해당 게시글을 신고합니다.',
          });
        },
      },
    });
  };

  return (
    <Button onClick={handleAccusesClick} size="sm" color="red">
      신고
    </Button>
  );
};

export default CommunityReportButton;
