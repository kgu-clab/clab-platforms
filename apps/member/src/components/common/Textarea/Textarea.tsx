import classNames from 'classnames';
import { ComponentPropsWithRef, forwardRef } from 'react';

interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  label?: string;
  value?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, className, value = '', maxLength, ...rest }, ref) => {
    const hasValue = value.length > 0;

    return (
      <div className="relative flex w-full">
        {label && (
          <label htmlFor={id} className="mb-1 ml-1 text-xs">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={classNames(
            'border p-2 rounded-lg focus:bg-white outline-none transition-colors',
            hasValue ? 'bg-white' : 'bg-gray-100',
            className,
          )}
          value={value}
          maxLength={maxLength}
          {...rest}
        />
        {maxLength && (
          <div
            className={classNames(
              'absolute bottom-4 right-2 bg-white text-xs px-2 rounded-lg boarder font-medium border',
              {
                'text-red-500': value.length >= maxLength,
              },
            )}
          >
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    );
  },
);

export default Textarea;
