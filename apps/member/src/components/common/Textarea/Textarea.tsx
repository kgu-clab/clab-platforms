import classNames from 'classnames';
import { ComponentPropsWithRef } from 'react';

interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  value?: string;
  className?: string;
}

const Textarea = ({ className, value = '', ...rest }: TextareaProps) => {
  const hasValue = value.length > 0;

  return (
    <textarea
      className={classNames(
        'border p-2 rounded-lg focus:bg-white',
        hasValue ? 'bg-white' : 'bg-gray-100',
        className,
      )}
      value={value}
      {...rest}
    />
  );
};

export default Textarea;
