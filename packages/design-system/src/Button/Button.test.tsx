import React from 'react';

import { fireEvent, getByTestId, render, screen } from '@testing-library/react';

import Button from './Button';
import { buttonVariants } from './Button.styles';

describe('Button', () => {
  it('컴포넌트가 크래시 없이 렌더링되어야 합니다.', () => {
    render(<Button>Click me</Button>);

    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it('컴포넌트에 색상과 크기 변형이 올바르게 적용되어야 합니다.', () => {
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

  it('컴포넌트에 비활성화 상태가 올바르게 적용되어야 합니다.', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(buttonVariants({ disabled: true }));
    expect(button).toBeDisabled();
  });

  it('컴포넌트에 로딩 상태가 올바르게 적용되어야 합니다.', () => {
    const { container } = render(<Button loading>Loading</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(buttonVariants({ loading: true }));
    const loadingIcon = getByTestId(container, 'loading-icon');
    expect(loadingIcon).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('클릭 이벤트가 올바르게 처리되어야 합니다.', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('ref가 버튼 엘리먼트로 올바르게 전달되어야 합니다.', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Click me</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.tagName).toBe('BUTTON');
  });

  it('추가적인 클래스명이 올바르게 적용되어야 합니다.', () => {
    render(<Button className="extra-class">Click me</Button>);

    expect(screen.getByRole('button', { name: /click me/i })).toHaveClass(
      'extra-class',
    );
  });
});
