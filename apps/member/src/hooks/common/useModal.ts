import { useSetModalStore } from '@store/modal';

interface OpenModalProps {
  title?: string;
  content: string;
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

  const openModal = ({
    title = 'C-Lab PLAY',
    content,
    accept,
    cancel,
  }: OpenModalProps) => {
    setModal({
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

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return { openModal, closeModal };
};

export default useModal;
