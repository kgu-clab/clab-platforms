import { MODAL_ACCEPT, MODAL_CONTENT, MODAL_TITLE } from '@constants/modal';
import { useModal } from '@hooks/common/useModal';
import { useSupportDeleteMutation } from '@hooks/queries/';

interface SupportRowActionsProps {
  onEdit: () => void;
  isAnswered: boolean;
  isOwner: boolean;
  id: number;
  onClose?: () => void;
}

const SupportRowActions = ({
  onEdit,
  isAnswered,
  isOwner,
  id,
  onClose,
}: SupportRowActionsProps) => {
  const { open } = useModal();
  const { supportDeleteMutate } = useSupportDeleteMutation();

  if (!isOwner) return null;
  else if (isAnswered) {
    return (
      <div className="text-sm text-gray-500">
        답변 완료된 문의는 수정/삭제할 수 없어요.
      </div>
    );
  }

  const handleDeleteClick = () => {
    open({
      title: MODAL_TITLE.DELETE,
      content: MODAL_CONTENT.DELETE,
      accept: {
        text: MODAL_ACCEPT.DELETE,
        onClick: () => {
          supportDeleteMutate(id, {
            onSuccess: () => {
              onClose?.();
            },
            onError: () => {
              onClose?.();
            },
          });
        },
      },
    });
  };

  return (
    <div className="flex justify-end gap-2 text-blue-600">
      <button
        onClick={onEdit}
        className="cursor-pointer border-none bg-transparent underline hover:text-blue-800"
      >
        수정
      </button>
      <button
        onClick={handleDeleteClick}
        className="cursor-pointer border-none bg-transparent underline hover:text-blue-800"
      >
        삭제
      </button>
    </div>
  );
};

export default SupportRowActions;
