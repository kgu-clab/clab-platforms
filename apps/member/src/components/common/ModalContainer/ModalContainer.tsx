import useModal from '@hooks/common/useModal';
import { useGetModalStore } from '@store/modal';
import Modal from '../Modal/Modal';
import { useEffect } from 'react';

const ModalContainer = () => {
  const { isOpen, title, content, accept, cancel } = useGetModalStore();
  const { closeModal } = useModal();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  return (
    <div id="modal-container">
      {isOpen && (
        <Modal>
          <Modal.Body title={title}>{content}</Modal.Body>
          <Modal.Footer>
            {accept && (
              <Modal.Button color="sky" onClick={accept.onClick}>
                {accept.text}
              </Modal.Button>
            )}
            {cancel && (
              <Modal.Button color="gray" onClick={cancel.onClick}>
                {cancel.text}
              </Modal.Button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ModalContainer;
