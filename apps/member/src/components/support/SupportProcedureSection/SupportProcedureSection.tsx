import Section from '@components/common/Section/Section';
import {
  FcSurvey,
  FcReading,
  FcMoneyTransfer,
  FcFilingCabinet,
} from 'react-icons/fc';

const stepContents = [
  {
    image: <FcSurvey size={32} />,
    title: '신청서 작성',
    description:
      '회비 사용과 관련된 정보를 입력하여 제출해 주세요. 누락된 정보가 있을 경우 승인이 반려될 수 있어요.',
  },
  {
    image: <FcReading size={32} />,
    title: '운영진 검토',
    description:
      '운영진이 신청서를 면밀히 검토하여 승인 여부를 결정해요. 24시간 이내에 처리가 되지 않는다면 별도로 문의해 주세요.',
  },
  {
    image: <FcMoneyTransfer size={32} />,
    title: '직접 결제',
    description:
      '승인이 되면 결제 대금을 이체 받아요. 이체 받은 결제 대금을 사용하여 직접 결제를 진행해 주세요.',
  },
  {
    image: <FcFilingCabinet size={32} />,
    title: '사용 후 반납',
    description:
      '대여기간이 지나면 운영진이 사용 내역을 확인하고 반납 여부를 확인해요.',
  },
];

const SupportProcedureSection = () => {
  return (
    <Section>
      <Section.Header title="회비 사용 절차는 이렇게 진행돼요" />
      <Section.Body className="grid grid-cols-2 gap-4 md:grid-cols-4 break-keep">
        {stepContents.map((stepContent, index) => (
          <div key={index}>
            <div className="p-2 mb-2 bg-gray-100 rounded-full w-fit">
              {stepContent.image}
            </div>
            <p className="font-semibold">{stepContent.title}</p>
            <p className="text-sm text-gray-500">{stepContent.description}</p>
          </div>
        ))}
      </Section.Body>
    </Section>
  );
};

export default SupportProcedureSection;
