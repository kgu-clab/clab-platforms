import { type TToastState, useSetToastStore } from '@store/toast';

interface AddToastProps {
  state: TToastState;
  message: string;
}

/**
 * 토스트 알림을 조작합니다.
 */
const useToast = () => {
  const setToast = useSetToastStore();

  /**
   * 새로운 토스트를 생성합니다.
   */
  const addToast = ({ state, message }: AddToastProps) => {
    setToast((prev) => [
      ...prev,
      {
        id: new Date().getTime(),
        state,
        message,
      },
    ]);
  };

  return addToast;
};

export default useToast;
