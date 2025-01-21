'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Button, Input } from '@clab-platforms/design-system';

import { Modal, Select, Textarea } from '@/components';
import {
  EMPTY_INPUT,
  OTHER_ACTIVITY_MAX_LENGTH,
  SELECT_OPTIONS,
} from '@/constants';
import type { ApplicationForm } from '@/types';
import { formattedPhoneInput } from '@/utils';
import { notFound } from 'next/navigation';

import { ApplyCheck, ApplyFailed, ApplySuccess } from '../components';
import { useApplicationMutation, useApplicationNow } from '../hooks';

const initialValue = {
  studentId: '',
  recruitmentId: 0,
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
  applicationType: SELECT_OPTIONS.RECRUITMENT_TYPE[0].value,
};

export default function Form() {
  const [formValue, setFormValue] = useState<ApplicationForm>(initialValue);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplySuccess, setIsApplySuccess] = useState(false);

  const { applicationMutate } = useApplicationMutation({ setIsApplySuccess });
  const { data, isError } = useApplicationNow();

  useEffect(() => {
    if (!isError && data?.data) {
      setFormValue((prev) => ({
        ...prev,
        applicationType: data?.data[0].applicationType,
      }));
    } else {
      notFound(); // 현재 모집 중인 공고가 없는 경우
    }
  }, [data, isError]);

  const isFormInputValid = () => {
    if (!formValue.studentId) toast.error(EMPTY_INPUT.STUDENT_ID);
    if (!formValue.name) toast.error(EMPTY_INPUT.NAME);
    if (!formValue.contact) toast.error(EMPTY_INPUT.CONTACT);
    if (!formValue.email) toast.error(EMPTY_INPUT.EMAIL);
    if (!formValue.department) toast.error(EMPTY_INPUT.DEPARTMENT);
    if (!formValue.birth) toast.error(EMPTY_INPUT.BIRTH);
    if (!formValue.address) toast.error(EMPTY_INPUT.ADDRESS);
    if (!formValue.otherActivities) toast.error(EMPTY_INPUT.OTHER_ACTIVITIES);

    return (
      !formValue.studentId ||
      !formValue.name ||
      !formValue.contact ||
      !formValue.email ||
      !formValue.department ||
      !formValue.birth ||
      !formValue.address ||
      !formValue.otherActivities
    );
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

  const handleModalConfirm = () => {
    applicationMutate(formValue);
    setModalContent(
      isApplySuccess ? (
        <ApplySuccess handleModalClose={handleModalClose} />
      ) : (
        <ApplyFailed handleModalClose={handleModalClose} />
      ),
    );
    isApplySuccess && setFormValue(initialValue);
  };

  const handleApplyButtonClick = () => {
    setFormValue((prev) => ({
      ...prev,
      contact: formValue.contact.replace(/-/g, ''),
      grade: Number(formValue.grade),
      recruitmentId: data?.data[0].id,
    }));

    const checked = isFormInputValid();

    if (!checked) {
      setModalContent(
        <ApplyCheck
          handleModalConfirm={handleModalConfirm}
          handleModalClose={handleModalClose}
        />,
      );
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 text-start lg:!grid-cols-2 lg:!gap-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Select
            className="col-span-2"
            label="구분"
            options={SELECT_OPTIONS.RECRUITMENT_TYPE}
            value={formValue.applicationType}
            name="applicationType"
            onChange={handleFormValueChange}
          />
          <Input
            id="name"
            name="name"
            placeholder="홍길동"
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
