import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import Button from './Button';

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it('applies color and size variants', () => {
    const { rerender } = render(
      <Button color="blue" size="lg">
        Blue Large
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'hover:bg-blue-200 text-blue-600 border-blue-600 px-4 py-2',
    );

    rerender(
      <Button color="red" size="sm">
        Red Small
      </Button>,
    );
    expect(button).toHaveClass(
      'hover:bg-red-200 text-red-600 border-red-600 px-2 py-1',
    );
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref to button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Click me</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('accepts extra classNames', () => {
    render(<Button className="extra-class">Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toHaveClass(
      'extra-class',
    );
  });
});
