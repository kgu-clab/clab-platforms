import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import { ATOM_KEY } from '@constants/key';

type TModal = {
  key: string;
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  custom: React.ReactNode;
  accept?: {
    text: string;
    onClick: () => void;
  };
  cancel?: {
    text: string;
    onClick: () => void;
  };
};

export const modalState = atom<TModal>({
  key: ATOM_KEY.MODAL,
  default: {
    key: '',
    isOpen: false,
    title: '',
    content: null,
    custom: null,
  },
});

export const useModalStore = () => useRecoilState(modalState);
export const useGetModalStore = () => useRecoilValue(modalState);
export const useSetModalStore = () => useSetRecoilState(modalState);
