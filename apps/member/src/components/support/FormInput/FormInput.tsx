import Input from '@components/common/Input/Input';
import { ChangeEvent } from 'react';

interface FormInputProps {
  title: string;
  essential: boolean;
  type?: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  title,
  essential,
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
}: FormInputProps) => {
  return (
    <div className="space-y-1">
      <label className="label">
        <p className="label-text">
          {title}
          {essential && <span className="text-sm text-red-500">*</span>}{' '}
        </p>
      </label>
      <div className="flex">
        <Input
          type={type}
          placeholder={placeholder}
          className="grow"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FormInput;
