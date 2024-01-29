import { Button } from '@clab/design-system';
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

interface ProfileInfoProps {
  label: string;
  children: React.ReactNode;
}

const ProfileSection = ({ data }: ProfileSectionProps) => {
  const { image, name, id, interests, phone, email, githubUrl, address } = data;

  return (
    <Section>
      <Section.Header title="나의 정보">
        <div className="flex gap-2">
          <Button color="orange" size="sm">
            수정
          </Button>
          <Button color="red" size="sm">
            로그아웃
          </Button>
        </div>
      </Section.Header>
      <Section.Body className="flex flex-col">
        <div className="flex flex-col text-center items-center">
          <Image
            width="w-32"
            height="h-32"
            src={image}
            alt="프로필 이미지"
            className="rounded-full m-auto object-cover"
          />
          <div className="mt-2">
            <p className="text-xl font-bold">{name}</p>
            <p className="text-sm font-semibold text-gray-500">{id}</p>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <ProfileInfo label="분야">{interests}</ProfileInfo>
          <ProfileInfo label="연락처">{phone}</ProfileInfo>
          <ProfileInfo label="이메일">{email}</ProfileInfo>
          <ProfileInfo label="주소">{address}</ProfileInfo>
          <ProfileInfo label="Github">{githubUrl}</ProfileInfo>
        </div>
      </Section.Body>
    </Section>
  );
};

const ProfileInfo = ({ label, children }: ProfileInfoProps) => {
  return (
    <div className="flex">
      <p className="w-24 font-semibold">{label}</p>
      <p className="grow">{children}</p>
    </div>
  );
};

export default ProfileSection;
