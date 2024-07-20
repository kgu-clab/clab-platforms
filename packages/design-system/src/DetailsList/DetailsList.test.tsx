import React from 'react';

import { render, screen } from '@testing-library/react';

import DetailsList from './DetailsList';

describe('DetailsList', () => {
  it('컴포넌트가 크래시 없이 렌더링되어야 합니다.', () => {
    render(
      <DetailsList label="Details List Label">
        <DetailsList.Item label="Item Label">Item Value</DetailsList.Item>
      </DetailsList>,
    );

    expect(screen.getByText('Details List Label')).toBeInTheDocument();
    expect(screen.getByText('Item Label')).toBeInTheDocument();
    expect(screen.getByText('Item Value')).toBeInTheDocument();
  });

  it('컴포넌트에 라벨이 있을 때 올바르게 렌더링되어야 합니다.', () => {
    render(
      <DetailsList label="Details List Label">
        <DetailsList.Item label="Item Label">Item Value</DetailsList.Item>
      </DetailsList>,
    );

    expect(screen.getByText('Details List Label')).toHaveClass(
      'pb-4 text-lg font-semibold',
    );
  });

  it('컴포넌트에 추가적인 클래스명이 올바르게 적용되어야 합니다.', () => {
    render(
      <DetailsList label="Details List Label" className="extra-class">
        <DetailsList.Item label="Item Label">Item Value</DetailsList.Item>
      </DetailsList>,
    );

    expect(screen.getByRole('list')).toHaveClass('extra-class');
  });

  it('DetailsListItem 컴포넌트에 라벨 클래스명이 올바르게 적용되어야 합니다.', () => {
    render(
      <DetailsList label="Details List Label">
        <DetailsList.Item label="Item Label" labelClassName="label-class">
          Item Value
        </DetailsList.Item>
      </DetailsList>,
    );

    expect(screen.getByText('Item Label')).toHaveClass('label-class');
  });

  it('DetailsListItem 컴포넌트에 추가적인 클래스명이 올바르게 적용되어야 합니다.', () => {
    render(
      <DetailsList label="Details List Label">
        <DetailsList.Item label="Item Label" className="extra-item-class">
          Item Value
        </DetailsList.Item>
      </DetailsList>,
    );

    expect(screen.getByText('Item Label').closest('li')).toHaveClass(
      'extra-item-class',
    );
  });
});
