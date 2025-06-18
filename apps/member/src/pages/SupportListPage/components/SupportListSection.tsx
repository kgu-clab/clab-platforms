import { useState } from 'react';

import { Table } from '@clab-platforms/design-system';

import MoreButton from '@components/common/MoreButton/MoreButton';
import { Section } from '@components/common/Section';

import { TABLE_HEAD } from '@constants/head';
import { supportList } from '@mocks/mocks';

import { SupportItem } from '@type/support';

import SupportTableRow from './SupportTableRow';

const SupportData = supportList as SupportItem[];

interface SupportListSectionProps {
  showAll?: boolean;
}

const SupportListSection = ({ showAll = false }: SupportListSectionProps) => {
  const [currentOpenItemIndex, setCurrentOpenItemIndex] = useState<number>(-1);

  const handleTableItemClick = (id: number) => {
    setCurrentOpenItemIndex(id);
  };
  SupportData.sort((a, b) => b.id - a.id);
  const displayData = showAll ? SupportData : SupportData.slice(0, 5);

  return (
    <Section>
      <Section.Header title={showAll ? ' ' : '최근 문의'}>
        {!showAll && <MoreButton to="./list">더보기</MoreButton>}
      </Section.Header>
      <Section.Body>
        <Table head={TABLE_HEAD.SUPPORT_TABLE}>
          {displayData.map((data) => (
            <SupportTableRow
              data={data}
              key={data.id}
              showAll={showAll}
              currentOpenItemIndex={currentOpenItemIndex}
              onClick={handleTableItemClick}
            />
          ))}
        </Table>
      </Section.Body>
    </Section>
  );
};
export default SupportListSection;
