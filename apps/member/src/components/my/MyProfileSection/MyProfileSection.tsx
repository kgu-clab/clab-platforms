import { ChangeEvent, useCallback, useState } from 'react';

import { Button, Grid, Input } from '@clab/design-system';

import Loading from '@components/common/Loading/Loading';
import LogoutButton from '@components/common/LogoutButton/LogoutButton';
import Section from '@components/common/Section/Section';
import Select from '@components/common/Select/Select';

import { FORM_DATA_KEY } from '@constants/api';
import { SELECT_OPTIONS } from '@constants/select';
import useModal from '@hooks/common/useModal';
import { useUserInfoMutation } from '@hooks/queries';
import { isObjectsEqual } from '@utils/common';

import type { MemberProfileType } from '@type/member';

import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';
import MyProfileImage from '../MyProfileImage/MyProfileImage';

interface MyProfileSectionProps {
  data: MemberProfileType;
}

const MyProfileSection = ({ data }: MyProfileSectionProps) => {
  const { openModal } = useModal();
  const { userInfoMutate, isPending } = useUserInfoMutation();

  const [isEdit, setIsEdit] = useState(false);
  const [inputs, setInputs] = useState<MemberProfileType>(data);

  const handleIsEditClick = () => {
    setIsEdit((prev) => {
      const isModified = !isObjectsEqual(inputs, data);
      if (prev && isModified) {
        // 편집모드이면서 수정된 내용이 있을 경우
        const formData = new FormData();
        const file = document.getElementById('imageUrl') as HTMLInputElement;
        if (file.files?.length) formData.append(FORM_DATA_KEY, file.files[0]);
        if (!isPending) {
          userInfoMutate({
            id: data.id,
            body: inputs,
            multipartFile: file.files?.length ? formData : null,
          });
        }
      }
      return !prev;
    });
  };

  const handleInputsChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setInputs((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleChangePasswordClick = useCallback(() => {
    openModal({
      title: '비밀번호 변경',
      custom: <ChangePasswordModal memberId={data.id} />,
    });
  }, [openModal, data.id]);

  const { interests, contact, email, address, githubUrl } = inputs;

  return (
    <Section>
      <Section.Header title="나의 정보">
        <div className="flex gap-2">
          {isEdit && (
            <Button size="sm" onClick={handleChangePasswordClick}>
              비빌번호 변경
            </Button>
          )}
          <Button
            color={isEdit ? 'orange' : 'primary'}
            size="sm"
            onClick={handleIsEditClick}
            disabled={isPending}
          >
            {isPending ? <Loading /> : isEdit ? '저장' : '수정'}
          </Button>
          {isEdit || <LogoutButton />}
        </div>
      </Section.Header>
      <Section.Body className="flex flex-col gap-4">
        <MyProfileImage isEdit={isEdit} data={data} onChange={setInputs} />
        <Grid col={2} gap="md">
          <Select
            label="분야"
            options={SELECT_OPTIONS.MY_FIELD}
            value={interests}
            name="interests"
            onChange={handleInputsChange}
            disabled={!isEdit}
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
          <Input
            id="Social Link"
            label="Social Link"
            name="githubUrl"
            className="col-span-2"
            value={githubUrl}
            placeholder={data.githubUrl}
            disabled={!isEdit}
            onChange={handleInputsChange}
          />
        </Grid>
      </Section.Body>
    </Section>
  );
};

export default MyProfileSection;
