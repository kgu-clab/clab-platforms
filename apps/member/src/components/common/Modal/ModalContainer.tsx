import { Suspense, useCallback, useLayoutEffect } from 'react';

import useModal from '@hooks/common/useModal';
import { useGetModalStore } from '@store/modal';

import Modal from './Modal';

const ModalContainer = () => {
  const { isOpen, title, content, custom, accept, cancel } = useGetModalStore();
  const { closeModal } = useModal();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal],
  );

  const onClickAccept = () => {
    accept?.onClick();
    closeModal();
  };

  const onClickCancel = () => {
    cancel?.onClick();
    closeModal();
  };

  useLayoutEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <div id="modal-container">
      <Suspense>
        {isOpen &&
          (custom || (
            <Modal>
              <Modal.Header>{title}</Modal.Header>
              <Modal.Body>{content}</Modal.Body>
              <Modal.Footer>
                {accept && (
                  <Modal.Button color="orange" onClick={onClickAccept}>
                    {accept.text}
                  </Modal.Button>
                )}
                {cancel && (
                  <Modal.Button color="gray" onClick={onClickCancel}>
                    {cancel.text}
                  </Modal.Button>
                )}
              </Modal.Footer>
            </Modal>
          ))}
      </Suspense>
    </div>
  );
};

export default ModalContainer;
