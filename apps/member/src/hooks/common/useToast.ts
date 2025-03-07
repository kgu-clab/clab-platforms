import { useCallback } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';

import { TToastState, ToastItem, setToastAtom, toastAtom } from '@atom/toast';

interface AddToastProps {
  state: TToastState;
  message: string;
}

/**
 * 토스트 알림을 조작합니다.
 */
export function useToast() {
  const setToast = useSetAtom(setToastAtom);

  /**
   * 새로운 토스트를 생성합니다.
   */
  const addToast = useCallback(
    ({ state, message }: AddToastProps) => {
      setToast((prev: Array<ToastItem>) => [
        ...prev,
        {
          id: new Date().getTime(),
          state,
          message,
        },
      ]);
    },
    [setToast],
  );

  /**
   * 토스트 목록을 변경합니다.
   */
  const updateToast = useCallback(
    (update: (prev: Array<ToastItem>) => Array<ToastItem>) => {
      setToast(update);
    },
    [setToast],
  );

  return { addToast, updateToast } as const;
}

export function useToastState() {
  return useAtomValue(toastAtom);
}
