import { Button } from '@clab-platforms/design-system';

import Modal from '@components/common/Modal/Modal';

interface CheckConfirmModalProps {
  message: string;
  handleConfirmButton: () => void;
  handleClose: () => void;
}

export const CheckConfirmModal = ({
  message,
  handleConfirmButton,
  handleClose,
}: CheckConfirmModalProps) => {
  return (
    <Modal>
      <Modal.Header>확인</Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer className="flex space-x-2">
        <Button
          className="w-full"
          color="blue"
          onClick={() => {
            handleConfirmButton();
            handleClose();
          }}
        >
          확인
        </Button>
        <Button className="w-full" color="red" onClick={handleClose}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
