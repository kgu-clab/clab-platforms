import React from 'react';

import { render } from '@testing-library/react';

import Spinner from './Spinner';
import { spinnerVariants } from './Spinner.styles';

describe('Spinner', () => {
  it('올바르게 렌더링되어야 합니다.', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toHaveClass(spinnerVariants({ size: 'md' }));
  });

  it('추가적인 클래스명이 적용되어야 합니다.', () => {
    const { container } = render(<Spinner className="extra-class" />);
    expect(container.firstChild).toHaveClass('extra-class');
  });

  it('다른 크기들이 올바르게 렌더링되어야 합니다.', () => {
    const { container: smallContainer } = render(<Spinner size="sm" />);
    const { container: mediumContainer } = render(<Spinner size="md" />);
    const { container: largeContainer } = render(<Spinner size="lg" />);

    expect(smallContainer.firstChild).toHaveClass(
      spinnerVariants({ size: 'sm' }),
    );
    expect(mediumContainer.firstChild).toHaveClass(
      spinnerVariants({ size: 'md' }),
    );
    expect(largeContainer.firstChild).toHaveClass(
      spinnerVariants({ size: 'lg' }),
    );
  });
});
