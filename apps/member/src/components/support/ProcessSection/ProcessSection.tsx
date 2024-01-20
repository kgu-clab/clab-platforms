import step3 from '@assets/support/check.svg';
import step2 from '@assets/support/checking.svg';
import step1 from '@assets/support/document.svg';
import next from '@assets/support/next.svg';
import Linker from '@components/common/Linker/Linker';
import { PATH } from '@constants/path';

const stepContents = [
  {
    id: 1,
    image: step1,
    description: '회비 사용과 관련된 정보를 기입하여 제출해주세요.',
  },
  {
    id: 2,
    image: next,
  },
  {
    id: 3,
    image: step2,
    description: '운영진이 신청서를 검토해요.',
  },
  {
    id: 4,
    image: next,
  },
  {
    id: 5,
    image: step3,
    description: '승인 또는 거절의 결과를 안내해요.',
  },
];

const ProcessSection = () => {
  return (
    <div className="space-y-12 text-center">
      <div>
        <h1 className="text-2xl font-bold pb-4">회비 사용 신청 절차</h1>
        <div className="flex place-items-center content-center">
          {stepContents.map(({ id, image, description }) => (
            <div key={id} className="flex flex-col w-40 items-center gap-4">
              <div className={id % 2 === 0 ? '' : 'rounded-full bg-gray-200'}>
                <img
                  src={image}
                  alt="절차"
                  className={
                    id % 2 === 0
                      ? 'h-full max-h-[50px] w-full max-w-[50px]'
                      : 'h-full max-h-[120px] w-full max-w-[120px] p-6'
                  }
                />
              </div>
              <p className="text-center text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="mb-2 text-center text-2xl font-bold">
          혹시 도서 신청을 원하시나요?
        </h1>
        <p>
          이미 보유중인 책일수도 있어요! &nbsp;
          <Linker
            to={PATH.LIBRARY}
            className="text-xl text-gray-500 decoration-pink-500 hover:text-black"
          >
            확인하러 가기
          </Linker>
        </p>
      </div>
      <hr />
    </div>
  );
};

export default ProcessSection;
