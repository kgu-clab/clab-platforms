import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import { ATOM_KEY } from '@constants/key';

export const AUTH_ATOM_STATE = {
  LOGIN: 'login',
  TWO_FACTOR: 'two-factor',
  FIRST_LOGIN: 'first-login',
} as const;

export const AUTH_ATOM_DEFAULT = {
  step: 'login',
  id: '',
  secretKey: '',
};

export const authAtomState = atom({
  key: ATOM_KEY.AUTH_ATOM_STATE,
  default: AUTH_ATOM_DEFAULT,
});

export const useAuthStore = () => useRecoilState(authAtomState);
export const useGetAuthStore = () => useRecoilValue(authAtomState);
export const useSetAuthStore = () => useSetRecoilState(authAtomState);
