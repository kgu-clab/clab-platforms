import React from 'react';

import { render, screen } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  it('should render input element with all provided props', () => {
    render(
      <Input
        id="username"
        label="Username"
        message="Please enter a valid username"
      />,
    );

    const inputElement = screen.getByLabelText('Username');
    const messageElement = screen.getByText('Please enter a valid username');

    expect(inputElement.id).toBe('username');
    expect(inputElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });

  it('should forward a ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.querySelector('input')).toBeTruthy();
  });
});
