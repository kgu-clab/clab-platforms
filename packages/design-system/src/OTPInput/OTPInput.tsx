import React, { useRef } from 'react';

import { cn } from '@clab-platforms/utils';

interface Props {
  type?: 'text' | 'number' | 'password';
  length?: number;
  value?: string[];
  onChange?: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  inputClassName?: string;
}

export default function OTPInput({
  type = 'text',
  length = 6,
  value = Array.from({ length }),
  onChange,
  inputClassName,
  ...rest
}: Props) {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleValueChange = (value: string, index: number) => {
    onChange?.((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.currentTarget.value[0];
    handleValueChange(value, index);
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && index > 0) {
      handleValueChange('', index);
      if (e.currentTarget.value === '') inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .slice(0, length - index)
      .split('');
    onChange?.(
      value.map((val, idx) =>
        idx >= index && idx < index + pastedData.length
          ? pastedData[idx - index]
          : val,
      ),
    );
    const nextField = inputRefs.current[index + pastedData.length];
    if (nextField) nextField.focus();
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${length}, 1fr)`,
        gap: '1rem',
      }}
      {...rest}
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={`otp-input-${index}`}
          ref={(el) => {
            inputRefs.current[index] = el!;
          }}
          type={type}
          maxLength={2}
          className={cn(
            'focus:border-clab-primary h-10 max-w-10 rounded-lg border-2 bg-transparent text-center outline-none transition-colors duration-300 ease-in-out',
            inputClassName,
          )}
          value={value[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
        />
      ))}
    </div>
  );
}
