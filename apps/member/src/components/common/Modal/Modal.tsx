import { PropsWithChildren } from 'react';

import { CloseOutline } from '@clab-platforms/icon';
import { cn } from '@clab-platforms/utils';

import { useModal } from '@hooks/common/useModal';

interface ModalProps extends PropsWithChildren {
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

interface ModalButtonProps extends ModalProps {
  color: 'gray' | 'red' | 'sky' | 'orange';
  onClick?: () => void;
}

const Modal = ({ children }: PropsWithChildren) => {
  const { close } = useModal();

  return (
    <div
      className="fixed inset-0 z-40"
      aria-labelledby="modalTitle"
      aria-modal="true"
      role="dialog"
    >
      <div className="flex min-h-screen items-center justify-center px-5">
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-gray-600/50" onClick={close} />
        </div>
        <div className="z-50 inline-block w-full space-y-4 overflow-hidden rounded-lg bg-white p-4 text-center shadow-lg sm:max-w-lg sm:text-left">
          {children}
        </div>
      </div>
    </div>
  );
};

const Header = ({ className, children }: ModalProps) => {
  const { close } = useModal();

  return (
    <header className="flex items-center justify-between">
      <h3 className={cn('text-xl font-semibold leading-6', className)}>
        {children}
      </h3>
      <button>
        <CloseOutline onClick={close} />
      </button>
    </header>
  );
};

const Body = ({ className, children }: ModalProps) => {
  return (
    <main
      className={cn(
        'min-h-20 whitespace-pre-wrap break-keep text-sm text-gray-500',
        className,
      )}
    >
      {children}
    </main>
  );
};

const Footer = ({ className, children }: ModalProps) => {
  return (
    <footer
      className={cn('flex justify-end gap-2 text-sm font-semibold', className)}
    >
      {children}
    </footer>
  );
};

const Button = ({
  color,
  onClick,
  className,
  disabled,
  loading,
  children,
}: ModalButtonProps) => {
  const colorStyle = {
    red: 'border-red-300 bg-red-100 text-red-500 hover:bg-red-200',
    sky: 'border-sky-300 bg-sky-100 text-sky-500 hover:bg-sky-200',
    gray: 'border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200',
    orange:
      'border-orange-300 bg-orange-100 text-orange-500 hover:bg-orange-200',
  } as const;

  return (
    <button
      type="button"
      className={cn(
        'w-full rounded-lg border py-1 transition-colors',
        colorStyle[color],
        className,
      )}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {children}
    </button>
  );
};

Header.displayName = 'Modal.Header';
Body.displayName = 'Modal.Body';
Footer.displayName = 'Modal.Footer';
Button.displayName = 'Modal.Button';

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.Button = Button;

export default Modal;
