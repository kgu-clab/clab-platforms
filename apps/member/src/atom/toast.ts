import { atom } from 'jotai';

export type TToastState = 'success' | 'error' | 'warning';

export interface ToastItem {
  id: number;
  state: TToastState;
  message: string;
}

export const toastAtom = atom<Array<ToastItem>>([]);

export const setToastAtom = atom(
  [],
  (get, set, update: (prev: Array<ToastItem>) => Array<ToastItem>) => {
    const currentToasts = get(toastAtom);
    set(toastAtom, update(currentToasts));
  },
);
