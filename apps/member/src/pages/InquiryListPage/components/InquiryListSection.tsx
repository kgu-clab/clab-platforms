import { useState } from 'react';

import { Table } from '@clab-platforms/design-system';

import MoreButton from '@components/common/MoreButton/MoreButton';
import { Section } from '@components/common/Section';

import { TABLE_HEAD } from '@constants/head';
import inquiryList from '@mocks/data/inquiryList.json';

import { InquiryItem } from '@type/inquiry';

import InquiryTableRow from './InquiryTableRow';

const inquiryData = inquiryList as InquiryItem[];

interface InquiryListSectionProps {
  showAll?: boolean;
}

const InquiryListSection = ({ showAll = false }: InquiryListSectionProps) => {
  const [currentOpenItemIndex, setCurrentOpenItemIndex] = useState<number>(-1);

  const handleTableItemClick = (id: number) => {
    setCurrentOpenItemIndex(id);
  };
  inquiryData.sort((a, b) => b.id - a.id);
  const displayData = showAll ? inquiryData : inquiryData.slice(0, 5);

  return (
    <Section>
      <Section.Header title={showAll ? ' ' : '최근 문의'}>
        {!showAll && <MoreButton to="./list">더보기</MoreButton>}
      </Section.Header>
      <Section.Body>
        <Table head={TABLE_HEAD.INQUIRY_TABLE}>
          <colgroup>
            <col className="w-2/12" /> {/* 번호 */}
            <col className="w-3/12" /> {/* 제목 */}
            <col className="w-2/12" /> {/* 문의자 */}
            <col className="w-3/12" /> {/* 문의일 */}
            <col className="w-2/12" /> {/* 카테고리 / 상태 */}
          </colgroup>
          {displayData.map((data) => (
            <InquiryTableRow
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
export default InquiryListSection;
