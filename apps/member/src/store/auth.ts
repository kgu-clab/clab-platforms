import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import { ATOM_KEY } from '@constants/key';

export const isLoggedInState = atom({
  key: ATOM_KEY.IS_LOGGED_IN,
  default: false,
});

export const useIsLoggedInStore = () => useRecoilState(isLoggedInState);
export const useGetIsLoggedInStore = () => useRecoilValue(isLoggedInState);
export const useSetIsLoggedInStore = () => useSetRecoilState(isLoggedInState);
