import { ComponentPropsWithRef, forwardRef } from 'react';
import { Input } from '@clab/design-system';
import classNames from 'classnames';

interface UploaderProps extends ComponentPropsWithRef<'input'> {
  label: string;
}

const Uploader = forwardRef<HTMLInputElement, UploaderProps>(
  ({ label, className, ...rest }, ref) => {
    return (
      <Input
        type="file"
        ref={ref}
        id={label}
        label={label}
        className={classNames('col-span-2 border-none', className)}
        {...rest}
      />
    );
  },
);

export default Uploader;
