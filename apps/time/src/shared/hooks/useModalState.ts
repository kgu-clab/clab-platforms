import { modalAtom } from '@/shared/atoms/modal';
import { ModalKey } from '@/shared/types';
import { useAtomValue } from 'jotai';

interface UseModalStateParams {
  key: ModalKey;
}

export default function useModalState({ key }: UseModalStateParams) {
  return useAtomValue(modalAtom)[key].visible;
}
