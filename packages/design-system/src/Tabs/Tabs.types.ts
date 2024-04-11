import { ComponentPropsWithRef } from 'react';

interface TabsOptionsType {
  icon: React.ReactNode;
  value: string;
}

export interface TabsProps {
  options: readonly TabsOptionsType[];
  value?: string;
  onChange?: (value: string) => void;
}

export interface TabsOptionProps extends ComponentPropsWithRef<'button'> {}
