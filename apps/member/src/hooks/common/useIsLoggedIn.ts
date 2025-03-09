import { useCallback } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';

import { isLoggedInAtom, setIsLoggedInAtom } from '@atom/auth';

export function useIsLoggedIn() {
  const setIsLoggedIn = useSetAtom(setIsLoggedInAtom);
  /**
   * 로그인 상태를 변경합니다.
   */
  const updateLogged = useCallback(
    (logged: boolean) => {
      setIsLoggedIn(logged);
    },
    [setIsLoggedIn],
  );

  return { updateLogged } as const;
}

export function useIsLoggedInState() {
  return useAtomValue(isLoggedInAtom);
}
