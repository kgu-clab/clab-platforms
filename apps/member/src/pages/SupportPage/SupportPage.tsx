import SupportIcons from '@assets/support/SupportIcons';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Linker from '@components/common/Linker/Linker';
import Section from '@components/common/Section/Section';
import SupportRequestForm from '@components/support/SupportRequestForm/SupportRequestForm';
import SupportHistorySection from '@components/support/SupportHistorySection/SupportHistorySection';
import { PATH } from '@constants/path';

const stepContents = [
  {
    id: 1,
    image: <SupportIcons.Check />,
    description: '회비 사용과 관련된 정보를 기입하여 제출해주세요.',
  },
  {
    id: 2,
    image: <SupportIcons.Next />,
    description: '',
  },
  {
    id: 3,
    image: <SupportIcons.Checking />,
    description: '운영진이 신청서를 검토해요.',
  },
  {
    id: 4,
    image: <SupportIcons.Next />,
    description: '',
  },
  {
    id: 5,
    image: <SupportIcons.Document />,
    description: '승인 또는 거절의 결과를 안내해요.',
  },
];

const SupportPage = () => {
  return (
    <Content>
      <Header title="회비" />
      <Section>
        <Section.Header title="회비 신청 절차" />
        <Section.Body className="grid grid-cols-5 text-center">
          {stepContents.map(({ id, image, description }) => (
            <div
              key={id}
              className="flex flex-col items-center justify-center gap-4"
            >
              <SupportIcons
                className={id === 2 || id === 4 ? 'w-4 col-span-2' : 'w-10'}
              >
                {image}
              </SupportIcons>
              {description && <p className="grow break-keep">{description}</p>}
            </div>
          ))}
        </Section.Body>
        <div className="mt-10 text-center">
          <p className="text-2xl font-bold">혹시 도서 신청을 원하시나요?</p>
          <div className="text-lg">
            <span>이미 보유중인 책일수도 있어요! </span>
            <Linker
              to={PATH.LIBRARY}
              className="text-gray-500 decoration-pink-500 hover:text-black"
            >
              확인하러 가기
            </Linker>
          </div>
        </div>
      </Section>
      <SupportRequestForm />
      <SupportHistorySection />
    </Content>
  );
};

export default SupportPage;
