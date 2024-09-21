import { useEffect, useState } from 'react';

import {
  ApprovalColor,
  CancelColor,
  HighPriorityColor,
} from '@clab-platforms/icon';
import { cn } from '@clab-platforms/utils';

import { type TToastState, useSetToastStore } from '@store/toast';

interface ToastProps {
  id: number;
  state: TToastState;
  message: string;
}

const STATE_ICON = {
  success: <ApprovalColor />,
  error: <CancelColor />,
  warning: <HighPriorityColor />,
} as const;

const Toast = ({ id, state, message }: ToastProps) => {
  const setToast = useSetToastStore();
  const [animation, setAnimation] = useState(false);

  const handleClick = () => {
    setAnimation(false);
    setTimeout(() => {
      setToast((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  };

  useEffect(() => {
    const showTimeout = setTimeout(() => setAnimation(true), 100);
    const hideTimeout = setTimeout(() => setAnimation(false), 3700);
    const removeTimeout = setTimeout(() => {
      setToast((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      clearTimeout(removeTimeout);
    };
  }, [id, setToast]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900/50 px-4 py-3 backdrop-blur-sm transition-all duration-300 ease-in-out',
        animation ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0',
      )}
      onClick={handleClick}
    >
      <div>{STATE_ICON[state]}</div>
      <p className="break-keep text-sm font-semibold text-white">{message}</p>
    </div>
  );
};

export default Toast;
