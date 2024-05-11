import React from 'react';

import { fireEvent, getByTestId, render, screen } from '@testing-library/react';

import Button from './Button';
import { buttonVariants } from './Button.styles';

describe('Button', () => {
  it('should render without crashing', () => {
    render(<Button>Click me</Button>);

    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it('should apply color and size variants correctly', () => {
    const { rerender } = render(
      <Button color="blue" size="lg">
        Blue Large
      </Button>,
    );

    let button = screen.getByRole('button');
    expect(button).toHaveClass(buttonVariants({ color: 'blue', size: 'lg' }));

    rerender(
      <Button color="red" size="sm">
        Red Small
      </Button>,
    );

    button = screen.getByRole('button');
    expect(button).toHaveClass(buttonVariants({ color: 'red', size: 'sm' }));
  });

  it('should apply disabled state correctly', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(buttonVariants({ disabled: true }));
    expect(button).toBeDisabled();
  });

  it('should apply loading state correctly', () => {
    const { container } = render(<Button loading>Loading</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(buttonVariants({ loading: true }));
    const loadingIcon = getByTestId(container, 'loading-icon');
    expect(loadingIcon).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should forward a ref to the button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Click me</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.tagName).toBe('BUTTON');
  });

  it('should accept extra classNames', () => {
    render(<Button className="extra-class">Click me</Button>);

    expect(screen.getByRole('button', { name: /click me/i })).toHaveClass(
      'extra-class',
    );
  });
});
