import { Link } from 'react-router';

import { Section } from '@components/common/Section';

import { PATH } from '@constants/path';
import Accodion from '@pages/InquiryPage/components/Accodion';
import { WriteIntroduceData } from '@pages/InquiryPage/staticData';

const InquiryWriteIntroduceSection = () => {
  return (
    <Section>
      <Section.Header title="문의 안내 사항" />
      <Section.Body>
        <div className="mb-4">
          문의하고 싶은 내용을 이미 C-Lab 회원이 질문 했을 수도 있어요.
          <br></br>
          <Link
            to={PATH.INQUIRY_LIST}
            className={'text-blue-500 hover:rounded-sm hover:bg-gray-200'}
          >
            최근 문의{' '}
          </Link>
          혹은{' '}
          <Link
            to={PATH.INQUIRY}
            className={'text-blue-500 hover:rounded-sm hover:bg-gray-200'}
          >
            {' '}
            FAQ
          </Link>{' '}
          에 원하는 답변 없다면 아래 안내사항을 읽고 문의 해주세요.
        </div>
        <Accodion items={WriteIntroduceData} />
      </Section.Body>
    </Section>
  );
};

export default InquiryWriteIntroduceSection;
