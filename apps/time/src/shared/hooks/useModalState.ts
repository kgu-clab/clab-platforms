import { modalAtom } from '@/shared/atoms/modal';
import type { ModalKey } from '@/shared/types';
import { useAtomValue } from 'jotai';

interface UseModalStateParams {
  key: ModalKey;
}

export default function useModalState({ key }: UseModalStateParams) {
  return useAtomValue(modalAtom)[key];
}
