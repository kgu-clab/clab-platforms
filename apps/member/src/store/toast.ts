import { ATOM_KEY } from '@constants/key';
import type { ToastStateType } from '@type/toast';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

interface ToastItem {
  id: number;
  state: ToastStateType;
  message: string;
}

export const toastState = atom<Array<ToastItem>>({
  key: ATOM_KEY.TOAST,
  default: [],
});

export const useToastStore = () => useRecoilState(toastState);
export const useGetToastStore = () => useRecoilValue(toastState);
export const useSetToastStore = () => useSetRecoilState(toastState);
