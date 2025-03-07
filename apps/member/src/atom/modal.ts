import { atom } from 'jotai';

import { Modal } from '@type/modal';

export const modalAtom = atom<Modal>({
  isOpen: false,
});

export const setModalAtom = atom(null, (_get, set, update: Modal) => {
  set(modalAtom, update);
});
