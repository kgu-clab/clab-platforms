import { useToastState } from '@hooks/common/useToast';

import Toast from './Toast';

const ToastContainer = () => {
  const toasts = useToastState();

  return (
    <div id="toast-container">
      {toasts.length > 0 && (
        <div className="fixed right-2 top-20 z-40 flex w-full max-w-xs flex-col gap-2 whitespace-pre-wrap">
          {toasts.map(({ id, ...rest }) => (
            <Toast key={id} id={id} {...rest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToastContainer;
