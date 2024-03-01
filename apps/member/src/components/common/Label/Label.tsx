import { ComponentPropsWithRef } from 'react';

interface LabelProps extends ComponentPropsWithRef<'label'> {
  required?: boolean;
}

const Label = ({
  className,
  children,
  required = false,
  ...rest
}: LabelProps) => {
  return (
    <label className={className} {...rest}>
      {children}
      {required && <span className="text-sm text-red-500">*</span>}
    </label>
  );
};

export default Label;
