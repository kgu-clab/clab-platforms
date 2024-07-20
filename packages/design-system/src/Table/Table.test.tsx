import React from 'react';

import { render, screen } from '@testing-library/react';

import Table from './Table';

describe('Table', () => {
  it('머리글을 포함하여 올바르게 렌더링되어야 합니다.', () => {
    const head = ['Name', 'Age', 'Address'];
    render(
      <Table head={head}>
        <Table.Row>
          <Table.Cell>John Doe</Table.Cell>
          <Table.Cell>30</Table.Cell>
          <Table.Cell>123 Street</Table.Cell>
        </Table.Row>
      </Table>,
    );

    head.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('123 Street')).toBeInTheDocument();
  });

  it('추가적인 클래스명이 올바르게 적용되어야 합니다.', () => {
    render(
      <Table className="extra-table-class">
        <Table.Row className="extra-row-class">
          <Table.Cell className="extra-cell-class">John Doe</Table.Cell>
        </Table.Row>
      </Table>,
    );

    const table = screen.getByRole('table');
    const row = screen.getByText('John Doe').closest('tr');
    const cell = screen.getByText('John Doe');

    expect(table).toHaveClass('extra-table-class');
    expect(row).toHaveClass('extra-row-class');
    expect(cell).toHaveClass('extra-cell-class');
  });

  it('머리글이 없는 경우 올바르게 렌더링되어야 합니다.', () => {
    render(
      <Table>
        <Table.Row>
          <Table.Cell>John Doe</Table.Cell>
          <Table.Cell>30</Table.Cell>
          <Table.Cell>123 Street</Table.Cell>
        </Table.Row>
      </Table>,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('123 Street')).toBeInTheDocument();
  });
});
