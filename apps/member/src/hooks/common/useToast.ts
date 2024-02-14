import { useSetToastStore } from '@store/toast';
import type { ToastStateType } from '@type/toast';

interface AddToastProps {
  state: ToastStateType;
  message: string;
}

const useToast = () => {
  const setToast = useSetToastStore();

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
