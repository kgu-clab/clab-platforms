import React from 'react';

import { render } from '@testing-library/react';

import Spinner from './Spinner';
import { spinnerVariants } from './Spinner.styles';

describe('Spinner', () => {
  it('should render correctly', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toHaveClass(spinnerVariants({ size: 'md' }));
  });

  it('should apply additional class names', () => {
    const { container } = render(<Spinner className="extra-class" />);
    expect(container.firstChild).toHaveClass('extra-class');
  });

  it('should correctly render different sizes', () => {
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
