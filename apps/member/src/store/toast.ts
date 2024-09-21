import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import { ATOM_KEY } from '@constants/key';

export type TToastState = 'success' | 'error' | 'warning';

interface ToastItem {
  id: number;
  state: TToastState;
  message: string;
}

export const toastState = atom<Array<ToastItem>>({
  key: ATOM_KEY.TOAST,
  default: [],
});

export const useToastStore = () => useRecoilState(toastState);
export const useGetToastStore = () => useRecoilValue(toastState);
export const useSetToastStore = () => useSetRecoilState(toastState);
