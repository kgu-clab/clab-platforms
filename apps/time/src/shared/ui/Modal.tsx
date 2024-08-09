'use client';

import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ChevronDownOutline, CloseOutline } from '@clab/icon';
import { cn } from '@clab/utils';

import { useOutsideClick } from '@/shared/hooks';

interface ModalProps extends PropsWithChildren {
  title: string;
  close: () => void;
}

interface ModalFilterProps extends PropsWithChildren {
  title: string;
}

interface ModalFilterItemProps extends PropsWithChildren {
  onClick: () => void;
  selected: boolean;
}

interface ModalDropdownProps extends PropsWithChildren {
  title: string;
  value: string | ReactNode;
}

interface ModalDropdownItemProps extends PropsWithChildren {
  onClick: () => void;
  selected: boolean;
}

interface ModalItemProps {
  title: string;
  value: string;
}

interface ModalDropdownContextType {
  action: {
    closeAction: () => void;
  };
}

const ModalDropdownContext = createContext<ModalDropdownContextType>({
  action: {
    closeAction: () => {},
  },
});

function ModalFilter({ title, children }: ModalFilterProps) {
  return (
    <div className="flex items-center gap-x-4 py-1 text-sm">
      <p className="w-20 break-keep">{title}</p>
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

function ModalDropdown({ title, value, children }: ModalDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);

  const closeAction = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const dropdownRef = useOutsideClick({ callback: closeAction });

  const defaultModalDropdownContext: ModalDropdownContextType = {
    action: {
      closeAction,
    },
  };

  return (
    <div className="flex items-center gap-x-4 py-1 text-sm" ref={dropdownRef}>
      <p className="w-20 shrink-0 break-keep">{title}</p>
      <div className="relative grow" onClick={() => setOpen((prev) => !prev)}>
        <ModalDropdownContext.Provider value={defaultModalDropdownContext}>
          <div className="flex items-center justify-between rounded-md border border-gray-400 p-1">
            <div
              className={cn(
                'flex text-gray-500',
                typeof value === 'string' && 'select-none',
              )}
            >
              {value}
            </div>
            <ChevronDownOutline
              className={cn(
                'mr-2 transition-all',
                open ? 'rotate-0' : 'rotate-180',
              )}
            />
          </div>
          {open && (
            <div className="absolute mt-4 h-60 w-full overflow-hidden overflow-y-scroll rounded-md border border-gray-400 bg-white p-2 drop-shadow-md">
              {children}
            </div>
          )}
        </ModalDropdownContext.Provider>
      </div>
    </div>
  );
}

function ModalDropdownItem({
  selected,
  onClick,
  children,
}: ModalDropdownItemProps) {
  const { action } = useContext(ModalDropdownContext);

  return (
    <button
      className={cn(
        'w-full rounded-sm p-2 text-start transition-colors hover:bg-gray-100',
        selected ? 'text-blue-400' : 'text-black',
      )}
      type="button"
      onClick={() => {
        onClick();
        action.closeAction();
      }}
    >
      {children}
    </button>
  );
}

function ModalItem({ title, value }: ModalItemProps) {
  return (
    <div className="flex items-center gap-x-4 py-1 text-sm">
      <p className="w-20 break-keep">{title}</p>
      <p>{value}</p>
    </div>
  );
}

function ModalContent({ children }: PropsWithChildren) {
  return <div className="space-y-2">{children}</div>;
}

export default function Modal({ title, close, children }: ModalProps) {
  const modalRef = useOutsideClick({ callback: close });

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
  }, [close]);

  return (
    <div className="fixed top-0 z-40 flex h-dvh w-dvw flex-col items-center justify-center bg-gray-800/60 transition-colors">
      <div
        ref={modalRef}
        className="h-fit w-3/4 space-y-4 rounded-xl bg-white p-6"
      >
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
Modal.Dropdown = ModalDropdown;
Modal.DropdownItem = ModalDropdownItem;
Modal.Item = ModalItem;

Modal.displayName = 'Modal';
ModalContent.displayName = 'ModalContent';
ModalFilter.displayName = 'ModalFilter';
ModalFilterItem.displayName = 'ModalFilterItem';
ModalDropdown.displayName = 'ModalDropdown';
ModalDropdownItem.displayName = 'ModalDropdownItem';
ModalItem.displayName = 'ModalItem';
