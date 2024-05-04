import { Button } from '@clab/design-system';

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
      title: '🚨 신고하기',
      content:
        '게시글에 신고가 누적되어 일정 수에 도달하면 운영진이 내용을 재검토합니다.\n정말 해당 게시글을 신고하시겠습니까?\n\n신고는 각 사용자당 한 번만 가능합니다. 중복은 인정되지 않습니다.',
      accept: {
        text: '신고하기',
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
      신고하기
    </Button>
  );
};

export default CommunityReportButton;
