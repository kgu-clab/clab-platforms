import { useCallback } from 'react';

import { useSetModalStore } from '@store/modal';
import { now } from '@utils/date';

interface OpenModalProps {
  key?: string;
  title?: string;
  content?: React.ReactNode;
  custom?: React.ReactNode;
  accept?: {
    text: string;
    onClick: () => void;
  };
  cancel?: {
    text: string;
    onClick: () => void;
  };
}

export interface UseModalResult<T> {
  open: (options: T) => void;
}

export function useModal() {
  const setModal = useSetModalStore();
  /**
   * 모달을 엽니다.
   */
  const open = ({
    key = now().toString(),
    title = 'Members',
    content,
    custom,
    accept,
    cancel,
  }: OpenModalProps) => {
    setModal({
      key,
      isOpen: true,
      title,
      content,
      custom,
      ...(accept && { accept }),
      cancel: {
        text: cancel?.text || '닫기',
        onClick: cancel?.onClick || close,
      },
    });
  };

  /**
   * 모달을 닫습니다.
   */
  const close = useCallback(() => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  }, [setModal]);

  /**
   * 모달을 강제 업데이트합니다.
   */
  const update = useCallback(() => {
    setModal((prev) => ({ ...prev, key: now().toString() }));
  }, [setModal]);

  return { open, close, update } as const;
}
