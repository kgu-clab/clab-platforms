import { ReactNode } from 'react';
import useModal from '@hooks/common/useModal';
import classNames from 'classnames';

interface ModalProps {
  onClick?: () => void;
  children: ReactNode;
}

interface ModalHeaderProps {
  title: string;
  children: ReactNode;
}

interface ModalButtonProps {
  color: 'gray' | 'red' | 'sky';
  children: ReactNode;
  onClick?: () => void;
}

const Modal = ({ children, onClick }: ModalProps) => {
  const { closeModal } = useModal();

  return (
    <div
      className="fixed z-50 inset-0"
      aria-labelledby="modalTitle"
      aria-modal="true"
      role="dialog"
    >
      <div className="flex items-center justify-center min-h-screen px-5">
        <div className="fixed inset-0 transition-opacity">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClick || closeModal}
          ></div>
        </div>
        <div className="inline-block w-full bg-white rounded-lg text-center sm:text-left overflow-hidden shadow-lg transform transition-all sm:max-w-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.Body = ({ title, children }: ModalHeaderProps) => {
  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <header>
        <h3 className="text-xl leading-6 font-semibold">{title}</h3>
      </header>
      <main className="mt-2 break-keep min-h-20 text-gray-500 text-sm">
        {children}
      </main>
    </div>
  );
};

Modal.Footer = ({ children }: { children: React.ReactNode }) => {
  return (
    <footer className="px-4 py-3 sm:px-6 flex justify-end gap-2 text-sm font-semibold">
      {children}
    </footer>
  );
};

Modal.Button = ({ color, children, onClick }: ModalButtonProps) => {
  const colorStyle = {
    red: 'border-red-300 bg-red-100 text-red-500 hover:bg-red-200',
    sky: 'border-sky-300 bg-sky-100 text-sky-500 hover:bg-sky-200',
    gray: 'border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200',
  } as const;

  return (
    <button
      type="button"
      className={classNames(
        'rounded-lg border py-1 w-full transition-colors',
        colorStyle[color],
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Modal;
