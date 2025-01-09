'use client';

import { useState } from 'react';

import { Button, Input } from '@clab-platforms/design-system';

import { Modal, Select, Textarea } from '@/components';
import { OTHER_ACTIVITY_MAX_LENGTH, SELECT_OPTIONS } from '@/constants';
import { formattedPhoneInput } from '@/utils';

const initialValue = {
  studentId: '',
  recruitmentId: SELECT_OPTIONS.RECRUITMENT_TYPE[0].value,
  name: '',
  contact: '',
  email: '',
  department: '',
  grade: SELECT_OPTIONS.GRADE[0].value,
  birth: '',
  address: '',
  interests: SELECT_OPTIONS.MY_FIELD[0].value,
  otherActivities: '',
  githubUrl: '',
};

export default function Form() {
  const [formValue, setFormValue] = useState(initialValue);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplySuccess, setIsApplySuccess] = useState(false);

  const checkInputValue = () => {
    if (
      !formValue.studentId ||
      !formValue.name ||
      !formValue.contact ||
      !formValue.email ||
      !formValue.department ||
      !formValue.grade ||
      !formValue.birth ||
      !formValue.address ||
      !formValue.interests ||
      !formValue.otherActivities
    ) {
      return false;
    }
    return true;
  };

  const handleFormValueChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const applySuccess = (
    <>
      <h3 className="text-2xl font-bold">지원하기</h3>
      <p className="text-lg text-gray-500">
        지원이 완료됐어요!
        <br />
        서류 검토 후 연락 드릴 예정이에요.
      </p>
      <div className="flex justify-center space-x-2">
        <Button
          onClick={handleModalClose}
          className="bg-clab-light-blue hover:bg-clab-light-blue px-4 hover:bg-opacity-70"
        >
          확인
        </Button>
      </div>
    </>
  );

  const applyFailed = (
    <>
      <h3 className="text-2xl font-bold">지원하기</h3>
      <p className="text-lg text-gray-500">
        지원에 실패했어요. <br />
        지원서를 검토하고 다시 시도해주세요.
      </p>
      <div className="flex justify-center space-x-2">
        <Button
          onClick={handleModalClose}
          className="bg-clab-light-blue hover:bg-clab-light-blue px-4 hover:bg-opacity-70"
        >
          확인
        </Button>
      </div>
    </>
  );

  const handleModalConfirm = () => {
    const checked = checkInputValue();
    setIsApplySuccess(true);
    if (checked) {
      setModalContent(isApplySuccess ? applySuccess : applyFailed);
    } else {
      setModalContent(applyFailed);
    }
  };

  const applyCheck = (
    <>
      <h3 className="text-2xl font-bold">지원하기</h3>
      <p className="text-lg text-gray-500">작성하신 정보로 지원하시겠습니까?</p>
      <div className="flex justify-center space-x-2">
        <Button
          onClick={handleModalConfirm}
          className="bg-clab-light-blue hover:bg-clab-light-blue px-4 hover:bg-opacity-70"
        >
          확인
        </Button>
        <Button
          onClick={handleModalClose}
          className="bg-clab-light-blue hover:bg-clab-light-blue px-4 hover:bg-opacity-70"
        >
          취소
        </Button>
      </div>
    </>
  );

  const handleApplyButtonClick = () => {
    setModalContent(applyCheck);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 text-start md:grid-cols-2 md:gap-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Select
            className="col-span-2"
            label="구분"
            options={SELECT_OPTIONS.RECRUITMENT_TYPE}
            value={formValue.recruitmentId}
            name="recruitmentId"
            onChange={handleFormValueChange}
          />
          <Input
            id="name"
            name="name"
            placeholder="김씨랩"
            className="grow"
            onChange={handleFormValueChange}
            value={formValue.name}
            label="이름"
            inputClassName="text-black"
          />
          <Input
            id="birth"
            name="birth"
            type="date"
            className="grow"
            inputClassName="text-black"
            onChange={handleFormValueChange}
            value={formValue.birth}
            label="생일"
          />
          <Input
            id="contact"
            name="contact"
            placeholder="010-1234-5678"
            className="grow"
            onChange={handleFormValueChange}
            value={formattedPhoneInput(formValue.contact)}
            label="연락처"
            inputClassName="text-black"
          />
          <Input
            id="email"
            name="email"
            placeholder="clab.coreteam@gmail.com"
            className="grow"
            onChange={handleFormValueChange}
            value={formValue.email}
            label="이메일"
            inputClassName="text-black"
          />
          <Input
            id="studentId"
            name="studentId"
            placeholder="202512345"
            className="grow"
            onChange={handleFormValueChange}
            value={formValue.studentId}
            label="학번"
            inputClassName="text-black"
          />
          <Select
            label="학년"
            options={SELECT_OPTIONS.GRADE}
            value={formValue.grade}
            name="grade"
            onChange={handleFormValueChange}
          />
          <Input
            id="department"
            name="department"
            placeholder="컴퓨터공학전공"
            className="col-span-2 grow"
            onChange={handleFormValueChange}
            value={formValue.department}
            label="학과"
            inputClassName="text-black"
          />
          <Input
            id="address"
            name="address"
            placeholder="수원시 (통학소요시간)"
            className="col-span-2 grow"
            onChange={handleFormValueChange}
            value={formValue.address}
            label="거주지"
            inputClassName="text-black"
          />
        </div>
        <div className="space-y-4">
          <Select
            label="관심 분야"
            options={SELECT_OPTIONS.MY_FIELD}
            value={formValue.interests}
            name="interests"
            onChange={handleFormValueChange}
          />
          <Input
            id="githubUrl"
            name="githubUrl"
            placeholder="https://github.com/kgu-clab"
            className="grow"
            onChange={handleFormValueChange}
            value={formValue.githubUrl}
            label="Github (선택)"
            inputClassName="text-black"
          />
          <Textarea
            id="otherActivities"
            name="otherActivities"
            placeholder="IT 활동 경험과 지원동기를 자유롭게 기술해주세요."
            className="h-56"
            onChange={handleFormValueChange}
            value={formValue.otherActivities}
            label="지원 동기 및 활동"
            maxLength={OTHER_ACTIVITY_MAX_LENGTH}
          />
          <Button
            className="bg-clab-light-gray w-full font-bold text-white"
            onClick={handleApplyButtonClick}
          >
            지원하기
          </Button>
        </div>
      </div>

      {isModalOpen && <Modal body={modalContent} isOpen={isModalOpen} />}
    </>
  );
}
