import { Link } from 'react-router';

import { Section } from '@components/common/Section';

import { PATH } from '@constants/path';
import Accordion from '@pages/SupportPage/components/Accordion';

const WriteIntroduceData = [
  {
    id: 1,
    question: '문의사항이 있어요!',
    answer: `문의하신 내용은 내부 검토를 거쳐 순차적으로 답변드려요.
내용이 구체적일수록 더 빠르게 도움을 드릴 수 있어요.`.trim(),
  },
  {
    id: 2,
    question: '버그를 발견했어요!',
    answer: `제보해주신 버그는 확인 후 우선순위에 따라 수정 작업을 진행해요.
문제 상황을 가능한 한 구체적으로 작성해주시면 빠른 해결에 도움을 줄 수 있어요.`.trim(),
  },
];

const SupportWriteIntroduceSection = () => {
  return (
    <Section>
      <Section.Header title="문의 안내 사항" />
      <Section.Body>
        <div className="mb-4">
          문의하고 싶은 내용을 이미 C-Lab 회원이 질문 했을 수도 있어요.
          <br />
          <Link
            to={PATH.SUPPORT_LIST}
            className="text-blue-500 hover:rounded-sm hover:bg-gray-200"
          >
            최근 문의
          </Link>{' '}
          혹은{' '}
          <Link
            to={PATH.SUPPORT}
            className="text-blue-500 hover:rounded-sm hover:bg-gray-200"
          >
            FAQ
          </Link>
          에 원하는 답변 없다면 아래 안내사항을 읽고 문의 해주세요.
        </div>
        <Accordion items={WriteIntroduceData} />
      </Section.Body>
    </Section>
  );
};

export default SupportWriteIntroduceSection;
