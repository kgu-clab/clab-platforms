import { FormEvent, useState } from 'react';

import { Button, Input } from '@clab-platforms/design-system';

import Select from '@components/common/Select/Select.tsx';

import { SELECT_OPTIONS } from '@constants/select.ts';
import { useMemberAddMutation } from '@hooks/queries/member/useMemberAddMutation.ts';

const AddMemberForm = () => {
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [grade, setGrade] = useState<number>(1);
  const [birth, setBirth] = useState<string>('');
  const [interest, setInterest] = useState<string>('NULL');
  const [githubUrl, setGithubUrl] = useState<string>('');
  const [studentStatus, setStudentStatus] = useState<string>('CURRENT');
  const { memberAddMutation } = useMemberAddMutation();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const body = {
      id,
      password: '',
      name,
      email,
      contact: phoneNumber,
      department: major,
      grade: grade,
      birth,
      address,
      interests: interest,
      githubUrl,
      studentStatus,
      imageUrl: '',
    };

    e.preventDefault();
    memberAddMutation(body);
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
      <Input
        label="학번"
        id="학번"
        name="id"
        placeholder="학번을 입력해주세요."
        onChange={(e) => setId(e.target.value)}
        required
      />
      <Input
        label="이름"
        id="이름"
        name="name"
        placeholder="이름을 입력해주세요."
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        label="전화번호"
        id="전화번호"
        name="phoneNumber"
        type="tel"
        placeholder="전화번호를 입력해주세요."
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <Input
        label="이메일"
        id="이메일"
        name="email"
        type="email"
        placeholder="이메일을 입력해주세요."
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="학과"
        id="학과"
        name="major"
        placeholder="학과를 입력해주세요."
        onChange={(e) => setMajor(e.target.value)}
        required
      />
      <Select
        label="구분"
        options={SELECT_OPTIONS.GRADE}
        name="studentStatus"
        onChange={(e) =>
          setGrade(SELECT_OPTIONS.GRADE[+e.target.value - 1].value)
        }
      />
      <Input
        label="생년월일"
        id="생년월일"
        name="birth"
        type="date"
        placeholder="생년월일을 입력해주세요."
        onChange={(e) => setBirth(e.target.value)}
        required
      />
      <Input
        label="주소"
        id="주소"
        name="address"
        placeholder="주소를 입력해주세요."
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <Select
        label="분야"
        options={SELECT_OPTIONS.MY_FIELD}
        name="interests"
        onChange={(e) => setInterest(e.target.value)}
      />
      <Input
        label="깃허브 주소"
        id="깃허브 주소"
        name="githubUrl"
        placeholder="깃허브 주소를 입력해주세요."
        onChange={(e) => setGithubUrl(e.target.value)}
      />
      <Select
        label="구분"
        options={SELECT_OPTIONS.STUDENT_STATUS}
        name="studentStatus"
        onChange={(e) => setStudentStatus(e.target.value)}
      />
      <Button type="submit" className="mt-2 w-full">
        멤버 추가하기
      </Button>
    </form>
  );
};

export default AddMemberForm;
