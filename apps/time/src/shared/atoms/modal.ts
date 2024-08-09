import { ModalKey } from '@/shared/types';
import { atom } from 'jotai';

type ModalAtom = {
  [key in ModalKey]: {
    visible: boolean;
  };
};

export const modalAtom = atom<ModalAtom>({
  timeTable: { visible: false },
});

export const updateModalAtom = atom(
  null,
  (get, set, update: { key: ModalKey; visible: boolean }) => {
    const currentState = get(modalAtom);
    const newState = {
      ...currentState,
      [update.key]: {
        visible: update.visible,
      },
    };
    set(modalAtom, newState);
  },
);
