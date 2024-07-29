import React from 'react';

import { render, screen } from '@testing-library/react';

import Badge from './Badge';
import { badgeVariants } from './Badge.styles';

describe('Badge', () => {
  it('컴포넌트가 크래시 없이 렌더링되어야 합니다.', () => {
    render(<Badge>Badge</Badge>);

    expect(screen.getByText('Badge')).toBeInTheDocument();
  });

  it('컴포넌트에 색상 변형이 올바르게 적용되어야 합니다.', () => {
    const { rerender } = render(<Badge color="primary">Primary Badge</Badge>);

    let badge = screen.getByText('Primary Badge');
    expect(badge).toHaveClass(badgeVariants({ color: 'primary' }));

    rerender(<Badge color="red">Red Badge</Badge>);
    badge = screen.getByText('Red Badge');
    expect(badge).toHaveClass(badgeVariants({ color: 'red' }));

    rerender(<Badge color="green">Green Badge</Badge>);
    badge = screen.getByText('Green Badge');
    expect(badge).toHaveClass(badgeVariants({ color: 'green' }));
  });

  it('추가적인 클래스명이 올바르게 적용되어야 합니다.', () => {
    render(<Badge className="extra-class">Badge</Badge>);

    expect(screen.getByText('Badge')).toHaveClass('extra-class');
  });

  it('ref가 스팬 엘리먼트로 올바르게 전달되어야 합니다.', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Badge</Badge>);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current?.tagName).toBe('SPAN');
  });
});
