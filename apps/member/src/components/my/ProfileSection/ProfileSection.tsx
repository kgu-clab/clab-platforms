import Button from '@components/common/Button/Button';
import Image from '@components/common/Image/Image';
import Section from '@components/common/Section/Section';

interface ProfileSectionProps {
  data: {
    image: string;
    name: string;
    id: number;
    interests: string;
    phone: string;
    email: string;
    githubUrl: string;
    address: string;
  };
}

interface InfoProps {
  label: string;
  children: React.ReactNode;
}

const ProfileSection = ({ data }: ProfileSectionProps) => {
  return (
    <Section>
      <Section.Header title="나의 정보">
        <div className="flex gap-2">
          <Button color="orange" children="수정" className="px-1" />
          <Button color="red" children="로그아웃" className="px-1" />
        </div>
      </Section.Header>
      <Section.Body className="flex flex-col">
        <div className="flex flex-col text-center items-center">
          <Image
            src={data.image}
            alt="프로필 이미지"
            className="rounded-full m-auto"
            width={32}
            height={32}
          />

          <div className="mt-2">
            <p className="text-xl font-bold">{data.name}</p>
            <p className="text-sm font-semibold text-gray-500">{data.id}</p>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <Info label="분야">{data.interests}</Info>
          <Info label="연락처">{data.phone}</Info>
          <Info label="이메일">{data.email}</Info>
          <Info label="Github">{data.githubUrl}</Info>
          <Info label="주소">{data.address}</Info>
        </div>
      </Section.Body>
    </Section>
  );
};

const Info = ({ label, children }: InfoProps) => {
  return (
    <div className="flex text-lg">
      <p className="w-24 font-semibold">{label}</p>
      <p className="grow">{children}</p>
    </div>
  );
};

export default ProfileSection;
