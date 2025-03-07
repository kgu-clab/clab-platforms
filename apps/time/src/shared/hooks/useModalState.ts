import { useAtomValue } from 'jotai';

import { modalAtom } from '@/shared/atoms/modal';
import type { ModalKey } from '@/shared/types';

interface UseModalStateParams {
  key: ModalKey;
}

export default function useModalState({ key }: UseModalStateParams) {
  return useAtomValue(modalAtom)[key];
}
