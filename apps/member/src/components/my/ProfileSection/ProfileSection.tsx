import { Button } from '@clab/design-system';
import Image from '@components/common/Image/Image';
import Section from '@components/common/Section/Section';
import { useSetIsLoggedInStore } from '@store/auth';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@constants/api';

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
  const setIsLoggedIn = useSetIsLoggedInStore();

  const onClickLogout = () => {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    setIsLoggedIn(false);
  };

  const { image, name, id, interests, phone, email, githubUrl, address } = data;

  return (
    <Section>
      <Section.Header title="나의 정보">
        <div className="flex gap-2">
          <Button color="orange" size="sm">
            수정
          </Button>
          <Button color="red" size="sm" onClick={onClickLogout}>
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
            alt={name}
            className="rounded-full m-auto object-cover"
          />
          <div className="mt-2">
            <p className="text-xl font-bold">{name}</p>
            <p className="text-sm font-semibold text-gray-500">{id}</p>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <ProfileInfoRow label="분야">{interests}</ProfileInfoRow>
          <ProfileInfoRow label="연락처">{phone}</ProfileInfoRow>
          <ProfileInfoRow label="이메일">{email}</ProfileInfoRow>
          <ProfileInfoRow label="주소">{address}</ProfileInfoRow>
          <ProfileInfoRow label="Github">{githubUrl}</ProfileInfoRow>
        </div>
      </Section.Body>
    </Section>
  );
};

const ProfileInfoRow = ({ label, children }: ProfileInfoProps) => {
  return (
    <div className="flex">
      <p className="w-24 font-semibold">{label}</p>
      <p className="grow">{children}</p>
    </div>
  );
};

export default ProfileSection;
