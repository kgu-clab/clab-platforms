import { ComponentPropsWithRef, forwardRef } from 'react';

import classNames from 'classnames';

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
            'rounded-lg border p-2 outline-none transition-colors focus:bg-white',
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
              'boarder absolute bottom-4 right-2 rounded-lg border bg-white px-2 text-xs font-medium',
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
Textarea.displayName = 'Textarea';

export default Textarea;
