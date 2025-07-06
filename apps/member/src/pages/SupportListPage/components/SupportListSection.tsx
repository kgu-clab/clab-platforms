import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { Table } from '@clab-platforms/design-system';

import MoreButton from '@components/common/MoreButton/MoreButton';
import { Section } from '@components/common/Section';

import { TABLE_HEAD } from '@constants/head';
import { supportList } from '@mocks/mocks';

import { SupportItem } from '@type/support';

import SupportTableRow from './SupportTableRow';

const supportData = supportList as SupportItem[];

interface SupportListSectionProps {
  showAll?: boolean;
}

const SupportListSection = ({ showAll = false }: SupportListSectionProps) => {
  const [currentOpenItemIndex, setCurrentOpenItemIndex] = useState<number>(-1);
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get('selected');

  const handleTableItemClick = (id: number) => {
    setCurrentOpenItemIndex(id);
  };

  supportData.sort((a, b) => b.id - a.id);
  const displayData = showAll ? supportData : supportData.slice(0, 5);

  useEffect(() => {
    if (selectedId && showAll) {
      const targetId = parseInt(selectedId);
      const targetSupport = supportData.find((item) => item.id === targetId);

      if (targetSupport) {
        setCurrentOpenItemIndex(targetId);
      }
    }
  }, [selectedId, supportData, showAll]);

  return (
    <Section>
      <Section.Header title={showAll ? ' ' : '최근 문의'}>
        {!showAll && <MoreButton to="./list">더보기</MoreButton>}
      </Section.Header>
      <Section.Body>
        <div className="w-full overflow-x-auto">
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
        </div>
      </Section.Body>
    </Section>
  );
};
export default SupportListSection;
