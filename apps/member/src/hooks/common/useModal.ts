import { useCallback } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';

import { modalAtom, setModalAtom } from '@/atom/modal';

import type { Modal } from '@type/modal';

export interface UseModalResult<T> {
  open: (options: T) => void;
}

export function useModal() {
  const setModal = useSetAtom(setModalAtom);
  /**
   * 모달을 엽니다.
   */
  const open = ({
    title = 'Members',
    content,
    custom,
    accept,
    cancel,
  }: Modal) => {
    setModal({
      isOpen: true,
      title,
      content,
      custom,
      ...(accept && { accept }),
      cancel: {
        text: cancel?.text ?? '닫기',
        onClick: cancel?.onClick || close,
      },
    });
  };

  /**
   * 모달을 닫습니다.
   */
  const close = useCallback(() => {
    setModal({ isOpen: false });
  }, [setModal]);

  return { open, close } as const;
}

export function useModalState() {
  return useAtomValue(modalAtom);
}
