import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import OTPInput from './OTPInput';

describe('OTPInput', () => {
  it('renders correctly with default props', () => {
    render(<OTPInput />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
  });

  it('moves focus on value entry', () => {
    const handleChange = vi.fn();
    render(<OTPInput onChange={handleChange} />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('handles paste correctly', () => {
    const handleChange = vi.fn();
    render(<OTPInput onChange={handleChange} />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => '123456' },
    });
    expect(handleChange).toHaveBeenCalledWith(['1', '2', '3', '4', '5', '6']);
  });
});
