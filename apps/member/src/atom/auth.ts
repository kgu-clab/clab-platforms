import { atom } from 'jotai';

export const isLoggedInAtom = atom(false);

export const setIsLoggedInAtom = atom(null, (_get, set, update: boolean) => {
  set(isLoggedInAtom, update);
});
