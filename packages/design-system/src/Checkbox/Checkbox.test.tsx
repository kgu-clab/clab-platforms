import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('컴포넌트가 크래시 없이 렌더링되어야 합니다.', () => {
    render(<Checkbox id="checkbox1" label="Checkbox Label" />);

    expect(screen.getByLabelText('Checkbox Label')).toBeInTheDocument();
  });

  it('체크박스에 추가적인 클래스명이 올바르게 적용되어야 합니다.', () => {
    render(
      <Checkbox
        id="checkbox2"
        label="Checkbox Label"
        checkboxClassName="extra-checkbox-class"
      />,
    );

    expect(screen.getByLabelText('Checkbox Label')).toHaveClass(
      'extra-checkbox-class',
    );
  });

  it('체크박스의 체크 상태가 올바르게 처리되어야 합니다.', () => {
    render(<Checkbox id="checkbox3" label="Checkbox Label" />);

    const checkbox = screen.getByLabelText('Checkbox Label');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('ref가 체크박스 엘리먼트로 올바르게 전달되어야 합니다.', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox id="checkbox4" label="Checkbox Label" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('컴포넌트에 추가적인 클래스명이 올바르게 적용되어야 합니다.', () => {
    render(
      <Checkbox
        id="checkbox5"
        label="Checkbox Label"
        className="extra-class"
      />,
    );

    expect(screen.getByText('Checkbox Label').closest('div')).toHaveClass(
      'extra-class',
    );
  });
});
