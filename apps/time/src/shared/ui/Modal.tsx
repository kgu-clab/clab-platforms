'use client';

import { PropsWithChildren, useEffect } from 'react';

import { CloseOutline } from '@clab/icon';
import { cn } from '@clab/utils';

interface ModalProps extends PropsWithChildren {
  title: string;
  visible: boolean;
  close: () => void;
}

interface ModalFilterProps extends PropsWithChildren {
  title: string;
}

interface ModalFilterItemProps extends PropsWithChildren {
  onClick: () => void;
  selected: boolean;
}

function ModalFilter({ title, children }: ModalFilterProps) {
  return (
    <div className="flex items-center gap-x-4">
      <p className="w-20 text-sm">{title}</p>
      <ul className="flex divide-x divide-gray-400 overflow-hidden rounded-md border border-gray-400">
        {children}
      </ul>
    </div>
  );
}

function ModalFilterItem({
  selected,
  onClick,
  children,
}: ModalFilterItemProps) {
  return (
    <button type="button" onClick={onClick}>
      <li
        className={cn(
          'cursor-pointer px-4 py-1 text-sm transition-colors ',
          selected
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'hover:bg-blue-500 hover:text-white',
        )}
      >
        {children}
      </li>
    </button>
  );
}

function ModalContent({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}

export default function Modal({ title, close, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.body.classList.add('overflow-hidden');
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed top-0 z-40 flex h-dvh w-dvw flex-col items-center justify-center bg-gray-800 bg-opacity-60 transition-colors',
      )}
    >
      <div className="h-fit w-3/4 space-y-4 rounded-xl bg-white p-6">
        <div className="flex w-full justify-between">
          <p className="font-bold">{title ?? ''}</p>
          <button type="button" onClick={close}>
            <CloseOutline width={24} height={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.Content = ModalContent;
Modal.Filter = ModalFilter;
Modal.FilterItem = ModalFilterItem;

Modal.displayName = 'Modal';
ModalContent.displayName = 'ModalContent';
ModalFilter.displayName = 'ModalFilter';
ModalFilterItem.displayName = 'ModalFilterItem';
