import { useCallback } from 'react';

import { updateModalAtom } from '@/shared/atoms/modal';
import type { ModalKey } from '@/shared/types';
import { useSetAtom } from 'jotai';

interface UseModalParams {
  key: ModalKey;
}

export default function useModalAction({ key }: UseModalParams) {
  const setModalAtom = useSetAtom(updateModalAtom);

  const open = useCallback(() => {
    setModalAtom({ key, visible: true });
  }, [key, setModalAtom]);

  const close = useCallback(() => {
    setModalAtom({ key, visible: false });
  }, [key, setModalAtom]);

  return { open, close };
}
