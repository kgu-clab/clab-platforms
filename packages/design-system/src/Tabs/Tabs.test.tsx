import React from 'react';

import { render, screen } from '@testing-library/react';

import Tabs from './Tabs';
import type { TabsOptions } from './Tabs.types';

const options: TabsOptions[] = [
  { value: 'Tab1', icon: <span>Icon1</span> },
  { value: 'Tab2', icon: <span>Icon2</span> },
  { value: 'Tab3', icon: <span>Icon3</span> },
];

describe('Tabs', () => {
  it('기본 속성으로 올바르게 렌더링되어야 합니다.', () => {
    render(<Tabs options={options} />);
    options.forEach((option) => {
      expect(screen.getByText(option.value)).toBeInTheDocument();
      expect(
        screen.getByText(`Icon${option.value.slice(-1)}`),
      ).toBeInTheDocument();
    });
  });

  it('선택된 탭이 올바르게 표시되어야 합니다.', () => {
    render(<Tabs options={options} value="Tab2" />);
    const selectedTab = screen.getByText('Tab2').closest('button');
    expect(selectedTab).toHaveClass('bg-gray-50 font-semibold');
  });

  it('추가적인 클래스명이 올바르게 적용되어야 합니다.', () => {
    render(<Tabs options={options} value="Tab1" onChange={() => {}} />);
    const tab = screen.getByText('Tab1').closest('button');
    expect(tab).toHaveClass('bg-gray-50 font-semibold');
  });
});
