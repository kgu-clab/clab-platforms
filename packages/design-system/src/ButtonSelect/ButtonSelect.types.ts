import { ComponentPropsWithRef } from 'react';

interface ButtonSelectOptionsType {
  icon: React.ReactNode;
  value: string;
}

export interface ButtonSelectProps {
  options: readonly ButtonSelectOptionsType[];
  value?: string;
  onChange?: (value: string) => void;
}

export interface ButtonSelectOptionProps
  extends ComponentPropsWithRef<'button'> {}
