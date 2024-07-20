import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import OTPInput from './OTPInput';

describe('OTPInput', () => {
  it('기본 속성으로 올바르게 렌더링되어야 합니다.', () => {
    render(<OTPInput />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
  });

  it('값 입력 시 포커스가 이동해야 합니다.', () => {
    const handleChange = vi.fn();
    render(<OTPInput onChange={handleChange} />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('붙여넣기를 올바르게 처리해야 합니다.', () => {
    const handleChange = vi.fn();
    render(<OTPInput onChange={handleChange} />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => '123456' },
    });
    expect(handleChange).toHaveBeenCalledWith(['1', '2', '3', '4', '5', '6']);
  });
});
