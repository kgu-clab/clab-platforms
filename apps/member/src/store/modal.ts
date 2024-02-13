import { ATOM_KEY } from '@constants/key';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

interface ModalState {
  isOpen: boolean;
  title: string;
  content: string;
  accept?: {
    text: string;
    onClick: () => void;
  };
  cancel?: {
    text: string;
    onClick: () => void;
  };
}

export const modalState = atom<ModalState>({
  key: ATOM_KEY.MODAL,
  default: {
    isOpen: false,
    title: '',
    content: '',
  },
});

export const useModalStore = () => useRecoilState(modalState);
export const useGetModalStore = () => useRecoilValue(modalState);
export const useSetModalStore = () => useSetRecoilState(modalState);
