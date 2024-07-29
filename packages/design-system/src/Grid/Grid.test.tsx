import React from 'react';

import { render, screen } from '@testing-library/react';

import Grid from './Grid';
import { gridVariants } from './Grid.styles';

describe('Grid', () => {
  it('컴포넌트가 크래시 없이 렌더링되어야 합니다.', () => {
    render(<Grid>Grid Content</Grid>);

    expect(screen.getByText('Grid Content')).toBeInTheDocument();
  });

  it('컴포넌트에 컬럼 변형이 올바르게 적용되어야 합니다.', () => {
    const { rerender } = render(<Grid col="2">Grid Content</Grid>);

    let grid = screen.getByText('Grid Content').closest('div');
    expect(grid).toHaveClass(gridVariants({ col: '2' }));

    rerender(<Grid col="4">Grid Content</Grid>);
    grid = screen.getByText('Grid Content').closest('div');
    expect(grid).toHaveClass(gridVariants({ col: '4' }));
  });

  it('컴포넌트에 간격 변형이 올바르게 적용되어야 합니다.', () => {
    const { rerender } = render(<Grid gap="sm">Grid Content</Grid>);

    let grid = screen.getByText('Grid Content').closest('div');
    expect(grid).toHaveClass(gridVariants({ gap: 'sm' }));

    rerender(<Grid gap="lg">Grid Content</Grid>);
    grid = screen.getByText('Grid Content').closest('div');
    expect(grid).toHaveClass(gridVariants({ gap: 'lg' }));
  });

  it('컴포넌트에 추가적인 클래스명이 올바르게 적용되어야 합니다.', () => {
    render(<Grid className="extra-class">Grid Content</Grid>);

    expect(screen.getByText('Grid Content').closest('div')).toHaveClass(
      'extra-class',
    );
  });

  it('ref가 div 엘리먼트로 올바르게 전달되어야 합니다.', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Grid ref={ref}>Grid Content</Grid>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.tagName).toBe('DIV');
  });
});
