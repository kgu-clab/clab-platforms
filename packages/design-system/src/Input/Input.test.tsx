import React from 'react';

import { render, screen } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  it('모든 제공된 속성으로 input 엘리먼트가 렌더링되어야 합니다.', () => {
    render(
      <Input
        id="username"
        label="사용자 이름"
        message="유효한 사용자 이름을 입력하세요."
      />,
    );

    const inputElement = screen.getByLabelText('사용자 이름');
    const messageElement = screen.getByText('유효한 사용자 이름을 입력하세요.');

    expect(inputElement.id).toBe('username');
    expect(inputElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });

  it('ref가 input 엘리먼트로 전달되어야 합니다.', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe('INPUT');
  });
});
