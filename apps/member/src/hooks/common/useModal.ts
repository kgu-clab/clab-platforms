import { useSetModalStore } from '@store/modal';
import { now } from '@utils/date';

interface OpenModalProps {
  key?: string;
  title?: string;
  content: React.ReactNode;
  accept?: {
    text: string;
    onClick: () => void;
  };
  cancel?: {
    text: string;
    onClick: () => void;
  };
}

const useModal = () => {
  const setModal = useSetModalStore();
  /**
   * open modal
   */
  const openModal = ({
    key = now().toString(),
    title = 'C-Lab PLAY',
    content,
    accept,
    cancel,
  }: OpenModalProps) => {
    setModal({
      key,
      isOpen: true,
      title,
      content,
      ...(accept && { accept }),
      cancel: {
        text: cancel?.text || '닫기',
        onClick: cancel?.onClick || closeModal,
      },
    });
  };
  /**
   * close modal
   */
  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };
  /**
   * update modal
   * - when you need to update modal content
   * - ex) when you need to update modal content after user input
   */
  const updateModal = () => {
    setModal((prev) => ({ ...prev, key: now().toString() }));
  };

  return { openModal, closeModal, updateModal };
};

export default useModal;
