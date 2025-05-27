import { useState } from 'react';

import { Table } from '@clab-platforms/design-system';

import MoreButton from '@components/common/MoreButton/MoreButton';
// import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';

import { inquiryData } from '@pages/InquiryPage/staticData';

import InquiryTableRow from './InquiryTableRow';

interface InquiryListSectionProps {
  showAll?: boolean;
}

const InquiryListSection = ({ showAll = false }: InquiryListSectionProps) => {
  const [currentOpenItemIndex, setCurrentOpenItemIndex] = useState<number>(-1);

  const handleTableItemClick = (id: number) => {
    setCurrentOpenItemIndex(id);
  };
  // showAll 이 false면 최근 5개만 slice
  inquiryData.sort((a, b) => b.id - a.id);
  const displayData = showAll ? inquiryData : inquiryData.slice(0, 5);

  return (
    <Section>
      <Section.Header title={showAll ? ' ' : '최근 문의'}>
        {!showAll && <MoreButton to="./list">더보기</MoreButton>}
      </Section.Header>
      <Section.Body>
        <Table head={['번호', '제목', '문의자', '문의일', '카테고리 / 상태']}>
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
            ></InquiryTableRow>
          ))}
        </Table>
        {/* TODO : 페이지네이션 만들기 */}
        {/* <Pagination
          className="justify-center mt-4"
          totalItems={totalItems}
          postLimit={size}
          onChange={handlePageChange}
          page={page}
        /> */}
      </Section.Body>
    </Section>
  );
};

export default InquiryListSection;
