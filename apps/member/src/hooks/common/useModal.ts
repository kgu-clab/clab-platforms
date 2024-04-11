import { useSetModalStore } from '@store/modal';
import { now } from '@utils/date';

interface OpenModalProps {
  key?: string;
  title?: string;
  content?: React.ReactNode;
  custom?: React.ReactNode;
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
    custom,
    accept,
    cancel,
  }: OpenModalProps) => {
    setModal({
      key,
      isOpen: true,
      title,
      content,
      custom,
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
   * force update modal
   * - when you need to update modal content
   * - ex) when you need to update modal content after user input
   */
  const forceUpdateModal = () => {
    setModal((prev) => ({ ...prev, key: now().toString() }));
  };

  return { openModal, closeModal, forceUpdateModal };
};

export default useModal;
