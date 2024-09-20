import { useState } from 'react';

import { Button, Grid, Input } from '@clab-platforms/design-system';
import { isObjectsEqual } from '@clab-platforms/utils';

import LogoutButton from '@components/common/LogoutButton/LogoutButton';
import Section from '@components/common/Section/Section';
import Select from '@components/common/Select/Select';

import { SELECT_OPTIONS } from '@constants/select';
import { useMyProfile, useUserInfoMutation } from '@hooks/queries';
import { useChangePasswordModal } from '@pages/MyPage/hooks/useChangePasswordModal';

import type { MemberProfileType } from '@type/member';

import { ProfileImage } from './ProfileImage';

export function ProfileSection() {
  const { data } = useMyProfile();
  const { userInfoMutate, isPending } = useUserInfoMutation();
  const { open } = useChangePasswordModal();

  const [isEdit, setIsEdit] = useState(false);
  const [inputs, setInputs] = useState<MemberProfileType>(data);

  const handleIsEditClick = () => {
    setIsEdit((prev) => {
      const isModified = !isObjectsEqual(inputs, data);
      if (prev && isModified) {
        // 편집모드이면서 수정된 내용이 있을 경우
        const file = document.getElementById('imageUrl') as HTMLInputElement;

        if (!isPending) {
          userInfoMutate({
            id: data.id,
            body: inputs,
            file: file?.files?.[0],
          });
        }
      }
      return !prev;
    });
  };

  const handleInputsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const { interests, contact, email, address, githubUrl } = inputs;

  return (
    <Section>
      <Section.Header title="나의 정보">
        <div className="flex gap-2">
          {isEdit && (
            <Button size="sm" onClick={() => open({ memberId: data.id })}>
              비빌번호 변경
            </Button>
          )}
          <Button
            color={isEdit ? 'orange' : 'primary'}
            size="sm"
            onClick={handleIsEditClick}
            disabled={isPending}
            loading={isPending}
          >
            {isEdit ? '저장' : '수정'}
          </Button>
          {isEdit || <LogoutButton />}
        </div>
      </Section.Header>
      <Section.Body className="flex flex-col gap-4">
        <ProfileImage disabled={!isEdit} value={data} onChange={setInputs} />
        <Grid gap="md" col="2">
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
}
