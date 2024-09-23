import { ChangeEvent, FormEvent, useState } from 'react';

import { Button, Input } from '@clab-platforms/design-system';

import Select from '@components/common/Select/Select';

import { SELECT_OPTIONS } from '@constants/select';
import { useMemberAddMutation } from '@hooks/queries/member/useMemberAddMutation';

import { AddMemberRequestType } from '@type/manage';

const defaultMemberInfo: AddMemberRequestType = {
  id: '',
  password: '',
  name: '',
  address: '',
  email: '',
  contact: '',
  department: '',
  grade: 1,
  birth: '',
  interests: '',
  githubUrl: '',
  imageUrl: '',
  studentStatus: 'CURRENT',
};

const AddMemberForm = () => {
  const [userInput, setUserInput] =
    useState<AddMemberRequestType>(defaultMemberInfo);
  const { memberAddMutation } = useMemberAddMutation({
    reset: () => setUserInput(defaultMemberInfo),
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    memberAddMutation(userInput);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setUserInput((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name !== 'grade'
          ? e.target.value
          : SELECT_OPTIONS.GRADE[+e.target.value - 1].value,
    }));
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
      <Input
        label="학번"
        id="학번"
        name="id"
        value={userInput.id}
        placeholder="학번을 입력해주세요."
        onChange={handleInputChange}
        required
      />
      <Input
        label="이름"
        id="이름"
        name="name"
        value={userInput.name}
        placeholder="이름을 입력해주세요."
        onChange={handleInputChange}
        required
      />
      <Input
        label="전화번호"
        id="전화번호"
        name="contact"
        type="tel"
        value={userInput.contact}
        placeholder="전화번호를 입력해주세요."
        onChange={handleInputChange}
        required
      />
      <Input
        label="이메일"
        id="이메일"
        name="email"
        type="email"
        value={userInput.email}
        placeholder="이메일을 입력해주세요."
        onChange={handleInputChange}
        required
      />
      <Input
        label="학과"
        id="학과"
        name="department"
        value={userInput.department}
        placeholder="학과를 입력해주세요."
        onChange={handleInputChange}
        required
      />
      <Select
        label="학년"
        options={SELECT_OPTIONS.GRADE}
        value={userInput.grade}
        name="grade"
        onChange={handleInputChange}
      />
      <Input
        label="생년월일"
        id="생년월일"
        name="birth"
        type="date"
        value={userInput.birth}
        placeholder="생년월일을 입력해주세요."
        onChange={handleInputChange}
        required
      />
      <Input
        label="주소"
        id="주소"
        name="address"
        value={userInput.address}
        placeholder="주소를 입력해주세요."
        onChange={handleInputChange}
        required
      />
      <Select
        label="분야"
        options={SELECT_OPTIONS.MY_FIELD}
        value={userInput.interests}
        name="interests"
        onChange={handleInputChange}
      />
      <Input
        label="깃허브 주소"
        id="깃허브 주소"
        name="githubUrl"
        value={userInput.githubUrl}
        placeholder="깃허브 주소를 입력해주세요."
        onChange={handleInputChange}
      />
      <Select
        label="구분"
        options={SELECT_OPTIONS.STUDENT_STATUS}
        value={userInput.studentStatus}
        name="studentStatus"
        onChange={handleInputChange}
      />
      <Button type="submit" className="mt-2 w-full">
        멤버 추가하기
      </Button>
    </form>
  );
};

export default AddMemberForm;
