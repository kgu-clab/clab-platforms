import { ChangeEvent, useCallback, useState } from 'react';
import { Button } from '@clab/design-system';
import Image from '@components/common/Image/Image';
import Section from '@components/common/Section/Section';
import { useSetIsLoggedInStore } from '@store/auth';
import { Input } from '@clab/design-system';
import { createImageUrl, removeTokens } from '@utils/api';
import { useUserInfoMutation } from '@hooks/queries';
import { ProfileData } from '@type/profile';
import { FORM_DATA_KEY } from '@constants/api';
import classNames from 'classnames';
import { getProfileRingStyle } from '@utils/style';
import useToast from '@hooks/common/useToast';
import useModal from '@hooks/common/useModal';

interface ProfileSectionProps {
  data: ProfileData;
}

const ProfileSection = ({ data }: ProfileSectionProps) => {
  const setIsLoggedIn = useSetIsLoggedInStore();
  const { userInfoMutate } = useUserInfoMutation();
  const { openModal, updateModal } = useModal();
  const toast = useToast();

  const [profileImage, setProfileImage] = useState<string>(data.imageUrl);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputs, setInputs] = useState<ProfileData>(data);
  const [newPassword, setNewPassword] = useState({
    password: '',
    passwordCheck: '',
  });

  const onClickChangePassword = () => {
    openModal({
      title: '비밀번호 변경',
      content: (
        <div className="space-y-4">
          <Input
            id="새로운 비밀번호"
            label="새로운 비밀번호"
            type="password"
            name="password"
            onChange={handlePasswordChange}
          />
          <Input
            id="비밀번호 확인"
            label="비밀번호 확인"
            type="password"
            name="passwordCheck"
            onChange={handlePasswordChange}
          />
        </div>
      ),
      accept: {
        text: '변경하기',
        onClick: onClickChangePasswordAccept,
      },
    });
  };

  const onClickLogout = () => {
    openModal({
      title: '로그아웃',
      content: '정말 로그아웃 하시겠습니까?',
      accept: {
        text: '로그아웃',
        onClick: () => {
          removeTokens();
          setIsLoggedIn(false);
        },
      },
    });
  };

  const handleIsEditClick = () => {
    setIsEdit((prev) => {
      if (prev) {
        const formData = new FormData();
        const file = document.getElementById('imageUrl') as HTMLInputElement;
        if (file.files?.length) formData.append(FORM_DATA_KEY, file.files[0]);

        userInfoMutate({
          id: data.id,
          body: inputs,
          multipartFile: file.files?.length ? formData : null,
        });
      }
      return !prev;
    });
  };

  const handleInputsChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({ ...prev, [name]: value }));
    updateModal();
  };

  const onClickChangePasswordAccept = () => {
    if (newPassword.password !== newPassword.passwordCheck) {
      return toast({
        state: 'error',
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
    userInfoMutate({
      id: data.id,
      body: { ...inputs, password: newPassword.password },
      multipartFile: null,
    });
  };

  const onChangeProfileImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImage(reader.result as string);
        }
      };
      if (e.target.files && e.target.files.length > 0) {
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    [],
  );

  const { name, id, interests, contact, email, address, githubUrl } = inputs;

  return (
    <Section>
      <Section.Header title="나의 정보">
        <div className="flex gap-2">
          <Button
            color={isEdit ? 'green' : 'orange'}
            size="sm"
            onClick={handleIsEditClick}
          >
            {isEdit ? '저장' : '수정'}
          </Button>
          {isEdit && (
            <Button size="sm" onClick={onClickChangePassword}>
              비빌번호 변경
            </Button>
          )}
          <Button color="red" size="sm" onClick={onClickLogout}>
            로그아웃
          </Button>
        </div>
      </Section.Header>
      <Section.Body className="flex flex-col">
        <div className="flex flex-col items-center text-center">
          <label
            htmlFor="imageUrl"
            className={classNames(
              'rounded-full ring ring-offset-1',
              getProfileRingStyle(data.roleLevel),
            )}
          >
            <Image
              width="w-32"
              height="h-32"
              src={createImageUrl(profileImage)}
              alt={name}
              className={classNames('object-cover m-auto rounded-full', {
                'cursor-pointer': isEdit,
              })}
            />
          </label>
          <Input
            style={{ display: 'none' }}
            id="imageUrl"
            name="imageUrl"
            type="file"
            onChange={onChangeProfileImage}
            disabled={!isEdit}
          />
          <div className="mt-2">
            <p className="text-xl font-bold">{name}</p>
            <p className="text-sm font-semibold text-gray-500">{id}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            id="분야"
            label="분야"
            name="interests"
            value={interests}
            placeholder={data.interests}
            disabled={!isEdit}
            onChange={handleInputsChange}
          />
          <Input
            id="연락처"
            label="연락처"
            name="contact"
            value={contact}
            placeholder={data.contact}
            disabled={!isEdit}
            onChange={handleInputsChange}
          />
          <Input
            id="이메일"
            label="이메일"
            name="email"
            value={email}
            placeholder={data.email}
            disabled={!isEdit}
            onChange={handleInputsChange}
          />
          <Input
            id="주소"
            label="주소"
            name="address"
            value={address}
            placeholder={data.address}
            disabled={!isEdit}
            onChange={handleInputsChange}
          />
          <div className="col-span-2">
            <Input
              id="Github"
              label="Github"
              name="githubUrl"
              value={githubUrl}
              placeholder={data.githubUrl}
              disabled={!isEdit}
              onChange={handleInputsChange}
            />
          </div>
        </div>
      </Section.Body>
    </Section>
  );
};

export default ProfileSection;
