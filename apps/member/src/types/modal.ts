export interface Modal {
  isOpen?: boolean;
  title?: string;
  content?: React.ReactNode;
  custom?: React.ReactNode;
  accept?: {
    text: string;
    onClick: () => void;
  };
  cancel?: {
    text: string;
    onClick: () => void;
  };
}
