import { ChangeEvent, useState } from 'react';
import { Button } from '@clab/design-system';
import Image from '@components/common/Image/Image';
import Section from '@components/common/Section/Section';
import { useSetIsLoggedInStore } from '@store/auth';
import { Input } from '@clab/design-system';
import { removeTokens } from '@utils/api';

export interface ProfileProps {
  image: string;
  name: string;
  id: number;
  interests: string;
  phone: string;
  email: string;
  githubUrl: string;
  address: string;
}

export interface ProfileSectionProps {
  data: ProfileProps;
}

const ProfileSection = ({ data }: ProfileSectionProps) => {
  const setIsLoggedIn = useSetIsLoggedInStore();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputs, setInputs] = useState<ProfileProps>(data);

  const onClickEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const onClickLogout = () => {
    const result = confirm('정말 로그아웃 하시겠습니까?');

    if (result) {
      removeTokens();
      setIsLoggedIn(false);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const { image, name, id, interests, phone, email, address, githubUrl } =
    inputs;

  return (
    <Section>
      <Section.Header title="나의 정보">
        <div className="flex gap-2">
          <Button
            color={isEdit ? 'green' : 'orange'}
            size="sm"
            onClick={onClickEdit}
          >
            {isEdit ? '저장' : '수정'}
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
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Input
            id="분야"
            label="분야"
            name="interests"
            value={interests}
            placeholder={data.interests}
            disabled={!isEdit}
            onChange={onChange}
          />
          <Input
            id="연락처"
            label="연락처"
            name="phone"
            value={phone}
            placeholder={data.phone}
            disabled={!isEdit}
            onChange={onChange}
          />
          <Input
            id="이메일"
            label="이메일"
            name="email"
            value={email}
            placeholder={data.email}
            disabled={!isEdit}
            onChange={onChange}
          />
          <Input
            id="주소"
            label="주소"
            name="address"
            value={address}
            placeholder={data.address}
            disabled={!isEdit}
            onChange={onChange}
          />
          <div className="col-span-2">
            <Input
              id="Github"
              label="Github"
              name="githubUrl"
              value={githubUrl}
              placeholder={data.githubUrl}
              disabled={!isEdit}
              onChange={onChange}
            />
          </div>
        </div>
      </Section.Body>
    </Section>
  );
};

export default ProfileSection;
