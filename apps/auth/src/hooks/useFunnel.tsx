import { Fragment, ReactElement, ReactNode, useState } from 'react';

interface StepProps<T> {
  name: T;
  children: ReactNode;
}

interface FunnelProps<T> {
  children: ReactElement<StepProps<T>>[];
}

/**
 * 페이지 이동을 위한 퍼널을 생성합니다.
 */
export function useFunnel<T extends string>(defaultStep: T) {
  const [step, setStep] = useState<T>(defaultStep);

  const Step = ({ name, children }: StepProps<T>): ReactElement => {
    return <Fragment key={`step-${name}`}>{children}</Fragment>;
  };

  const Funnel = ({ children }: FunnelProps<T>): ReactElement | null => {
    const targetStep = children.find(
      (childStep) => childStep.props.name === step,
    );

    return targetStep || null;
  };

  Step.displayName = 'FunnelStep';
  Funnel.displayName = 'Funnel';

  Funnel.Step = Step;

  return { Funnel, step, setStep } as const;
}
