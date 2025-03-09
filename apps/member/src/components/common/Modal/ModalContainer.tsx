import { Suspense, useCallback, useLayoutEffect } from 'react';

import { useModal, useModalState } from '@hooks/common/useModal';

import Modal from './Modal';

const ModalContainer = () => {
  const { isOpen, title, content, custom, accept, cancel } = useModalState();
  const { close } = useModal();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    },
    [close],
  );

  const handleAcceptClick = () => {
    accept?.onClick();
    close();
  };

  const handleCancelClick = () => {
    cancel?.onClick();
    close();
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
                  <Modal.Button color="orange" onClick={handleAcceptClick}>
                    {accept.text}
                  </Modal.Button>
                )}
                {cancel && (
                  <Modal.Button color="gray" onClick={handleCancelClick}>
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
