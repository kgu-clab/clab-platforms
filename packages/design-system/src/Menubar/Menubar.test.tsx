import React from 'react';

import { render, screen } from '@testing-library/react';

import Menubar from './Menubar';

describe('Menubar', () => {
  it('컴포넌트가 크래시 없이 렌더링되어야 합니다.', () => {
    render(
      <Menubar>
        <Menubar.Item>Item 1</Menubar.Item>
        <Menubar.Item>Item 2</Menubar.Item>
      </Menubar>,
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('컴포넌트에 간격 변형이 올바르게 적용되어야 합니다.', () => {
    const { rerender } = render(
      <Menubar gap="sm">
        <Menubar.Item>Item 1</Menubar.Item>
        <Menubar.Item>Item 2</Menubar.Item>
      </Menubar>,
    );

    let menubar = screen.getByRole('list');
    expect(menubar).toHaveClass('gap-2');

    rerender(
      <Menubar gap="lg">
        <Menubar.Item>Item 1</Menubar.Item>
        <Menubar.Item>Item 2</Menubar.Item>
      </Menubar>,
    );

    menubar = screen.getByRole('list');
    expect(menubar).toHaveClass('gap-8');
  });

  it('MenubarItem 컴포넌트에 선택된 상태가 올바르게 적용되어야 합니다.', () => {
    const { rerender } = render(
      <Menubar>
        <Menubar.Item selected>Item 1</Menubar.Item>
        <Menubar.Item>Item 2</Menubar.Item>
      </Menubar>,
    );

    let selectedItem = screen.getByText('Item 1');
    expect(selectedItem).toHaveClass('text-black underline underline-offset-4');

    rerender(
      <Menubar>
        <Menubar.Item>Item 1</Menubar.Item>
        <Menubar.Item selected>Item 2</Menubar.Item>
      </Menubar>,
    );

    selectedItem = screen.getByText('Item 2');
    expect(selectedItem).toHaveClass('text-black underline underline-offset-4');
  });

  it('MenubarItem 컴포넌트에 추가적인 클래스명이 올바르게 적용되어야 합니다.', () => {
    render(
      <Menubar>
        <Menubar.Item className="extra-class">Item 1</Menubar.Item>
      </Menubar>,
    );

    expect(screen.getByText('Item 1')).toHaveClass('extra-class');
  });
});
