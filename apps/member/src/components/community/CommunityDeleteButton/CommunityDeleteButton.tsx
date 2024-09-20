import { Button } from '@clab-platforms/design-system';

import { MODAL_ACCEPT, MODAL_CONTENT, MODAL_TITLE } from '@constants/modal';
import { useModal } from '@hooks/common/useModal';
import { useBoardDeleteMutation } from '@hooks/queries';

interface Props {
  id: number;
}

const CommunityDeleteButton = ({ id }: Props) => {
  const { open } = useModal();
  const { boardDeleteMutate } = useBoardDeleteMutation();

  const handleAccusesClick = () => {
    return open({
      title: MODAL_TITLE.DELETE,
      content: MODAL_CONTENT.DELETE,
      accept: {
        text: MODAL_ACCEPT.DELETE,
        onClick: () => {
          boardDeleteMutate(id);
        },
      },
    });
  };

  return (
    <Button onClick={handleAccusesClick} size="sm" color="red">
      삭제
    </Button>
  );
};

export default CommunityDeleteButton;
