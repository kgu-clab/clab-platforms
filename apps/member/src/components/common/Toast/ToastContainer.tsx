import { useGetToastStore } from '@store/toast';
import Toast from './Toast';

const ToastContainer = () => {
  const toasts = useGetToastStore();

  return (
    <div id="toast-container">
      {toasts.length > 0 && (
        <div className="fixed z-40 top-20 right-2 flex flex-col gap-2 max-w-xs w-full">
          {toasts.map(({ id, ...rest }) => (
            <Toast key={id} id={id} {...rest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToastContainer;
