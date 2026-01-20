import type { HTMLAttributes, ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import {
  modalBackdropVariant,
  modalBodyVariant,
  modalCloseButtonVariant,
  modalContentVariant,
  modalDescriptionVariant,
  modalHeaderTopVariant,
  modalHeaderVariant,
  modalSubtitleVariant,
  modalTitleVariant,
  type ModalContentSize,
} from "./modal.css";
import { cn } from "@/shared/utils/cn";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  description?: string;
  size?: ModalContentSize;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  description,
  size,
  children,
  className,
  ...props
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={cn(modalBackdropVariant())} onClick={onClose} {...props}>
      <div
        className={cn(modalContentVariant({ size }), className)}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || subtitle || description) && (
          <div className={cn(modalHeaderVariant())}>
            <div className={cn(modalHeaderTopVariant())}>
              {title && <p className={cn(modalTitleVariant())}>{title}</p>}
              <button
                type="button"
                className={cn(modalCloseButtonVariant())}
                onClick={onClose}
                aria-label="닫기"
              >
                <IoClose size={20} color="#808080" />
              </button>
            </div>
            {subtitle && (
              <p className={cn(modalSubtitleVariant())}>{subtitle}</p>
            )}
            {description && (
              <p className={cn(modalDescriptionVariant())}>{description}</p>
            )}
          </div>
        )}
        <div className={cn(modalBodyVariant())}>{children}</div>
      </div>
    </div>
  );
}
