import Linker from '@components/common/Linker/Linker';
import { PATH } from '@constants/path';
import classNames from 'classnames';
import Icons from '@components/common/Icons/Icons';

const stepContents = [
  {
    id: 1,
    image: 'document',
    description: '회비 사용과 관련된 정보를 기입하여 제출해주세요.',
  },
  {
    id: 2,
    image: 'next',
  },
  {
    id: 3,
    image: 'checking',
    description: '운영진이 신청서를 검토해요.',
  },
  {
    id: 4,
    image: 'next',
  },
  {
    id: 5,
    image: 'check',
    description: '승인 또는 거절의 결과를 안내해요.',
  },
];

const ProcessSection = () => {
  return (
    <div className="space-y-12 text-center">
      <div>
        <h1 className="text-2xl font-bold pb-4">회비 사용 신청 절차</h1>
        <div className="flex justify-center items-center">
          {stepContents.map(({ id, image, description }) => (
            <div
              key={id}
              className="flex flex-col items-center w-16 md:w-40 gap-4"
            >
              <div
                className={classNames({
                  'rounded-full bg-gray-200': image != 'next',
                })}
              >
                <Icons
                  name={image}
                  width={image != 'next' ? 24 : 16}
                  height={image != 'next' ? 24 : 16}
                  className="p-4"
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
