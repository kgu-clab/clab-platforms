import type { HTMLAttributes } from "react";
import {
  stepProgressBarVariant,
  stepVariant,
  type StepStatus,
} from "./stepProgressBar.css";
import { cn } from "@/shared/utils/cn";

export interface StepProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  currentStep: number;
  totalSteps: number;
}

export default function StepProgressBar({
  currentStep,
  totalSteps,
  className,
  ...props
}: StepProgressBarProps) {
  return (
    <div className={cn(stepProgressBarVariant(), className)} {...props}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const status: StepStatus = index < currentStep ? "active" : "inactive";
        return <div key={index} className={stepVariant({ status })} />;
      })}
    </div>
  );
}
