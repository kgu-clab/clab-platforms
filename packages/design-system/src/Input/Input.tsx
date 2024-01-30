import React, { ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends ComponentPropsWithRef<'input'> {
  id: string;
  label?: string;
}

const Input = ({ label, id, className, ...rest }: InputProps) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="text-xs mb-1 ml-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={twMerge('border rounded-lg p-2', className)}
        {...rest}
      />
    </div>
  );
};

export default Input;
