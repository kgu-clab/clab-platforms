'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input, Spinner } from '@clab-platforms/design-system';

import { Modal, Select, Textarea } from '@/components';
import { OTHER_ACTIVITY_MAX_LENGTH, SELECT_OPTIONS } from '@/constants';
import { ApplicationForm } from '@/types';
import { notFound } from 'next/navigation';

import { ApplyCheck, ApplyFailed, ApplySuccess } from '../components';
import { useApplicationMutation, useApplicationNow } from '../hooks';

export default function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
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
    },
  });
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplySuccess, setIsApplySuccess] = useState(false);

  const { applicationMutate } = useApplicationMutation({ setIsApplySuccess });
  const { data, isError, isLoading } = useApplicationNow();

  useEffect(() => {
    if (!isError && data?.data) {
      setValue('applicationType', data?.data[0].applicationType);
    } else {
      notFound(); // 현재 모집 중인 공고가 없는 경우
    }
  }, [data, isError, setValue]);

  if (isLoading) {
    return (
      <>
        <Spinner size="lg" />
      </>
    );
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = (formData: ApplicationForm) => {
    applicationMutate(formData);
    setModalContent(
      isApplySuccess ? (
        <ApplySuccess handleModalClose={handleModalClose} />
      ) : (
        <ApplyFailed handleModalClose={handleModalClose} />
      ),
    );
    isApplySuccess && reset();
  };

  const onSubmit = (data: ApplicationForm) => {
    if (Object.keys(errors).length === 0) {
      setModalContent(
        <ApplyCheck
          handleModalConfirm={() => handleModalConfirm(data)}
          handleModalClose={handleModalClose}
        />,
      );
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid w-full grid-cols-1 gap-4 text-start lg:!grid-cols-2 lg:!gap-8"
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Select
            className="col-span-2"
            label="구분"
            id="applicationType"
            options={SELECT_OPTIONS.RECRUITMENT_TYPE}
            {...register('applicationType', {
              required: {
                value: true,
                message: '구분은 필수 항목이에요.',
              },
            })}
          />
          {errors.applicationType && (
            <span className="ml-1 mt-1 text-xs text-red-500">
              {errors.applicationType.message}
            </span>
          )}
          <Input
            id="name"
            placeholder="홍길동"
            className="grow"
            label="이름"
            inputClassName="text-black"
            {...register('applicationType', {
              required: {
                value: true,
                message: '구분은 필수 항목이에요.',
              },
            })}
            message={errors.name?.message}
            messageClassName="text-red-500"
          />
          <Input
            id="birth"
            label="생일"
            type="date"
            className="grow"
            inputClassName="text-black"
            {...register('birth', {
              required: {
                value: true,
                message: '생일은 필수 항목이에요.',
              },
            })}
            message={errors.birth?.message}
            messageClassName="text-red-500"
          />
          <Input
            id="contact"
            placeholder="010-1234-5678"
            className="grow"
            label="연락처"
            inputClassName="text-black"
            {...register('contact', {
              required: {
                value: true,
                message: '연락처는 필수 항목이에요.',
              },
            })}
            message={errors.contact?.message}
            messageClassName="text-red-500"
          />
          <Input
            id="email"
            placeholder="clab.coreteam@gmail.com"
            className="grow"
            label="이메일"
            inputClassName="text-black"
            {...register('email', {
              required: {
                value: true,
                message: '이메일은 필수 항목이에요.',
              },
            })}
            message={errors.email?.message}
            messageClassName="text-red-500"
          />
          <Input
            id="studentId"
            placeholder="202512345"
            className="grow"
            label="학번"
            inputClassName="text-black"
            {...register('studentId', {
              required: {
                value: true,
                message: '학번은 필수 항목이에요.',
              },
            })}
            message={errors.studentId?.message}
            messageClassName="text-red-500"
          />
          <Select
            label="학년"
            options={SELECT_OPTIONS.GRADE}
            id="grade"
            {...register('grade', {
              required: {
                value: true,
                message: '학년은 필수 항목이에요.',
              },
            })}
          />
          {errors.grade && (
            <span className="ml-1 mt-1 text-xs text-red-500">
              {errors.grade.message}
            </span>
          )}
          <Input
            id="department"
            placeholder="컴퓨터공학전공"
            className="col-span-2 grow"
            label="학과"
            inputClassName="text-black"
            {...register('department', {
              required: {
                value: true,
                message: '학과는 필수 항목이에요.',
              },
            })}
            message={errors.department?.message}
            messageClassName="text-red-500"
          />
          <Input
            id="address"
            placeholder="수원시 (통학소요시간)"
            className="col-span-2 grow"
            label="거주지"
            inputClassName="text-black"
            {...register('address', {
              required: {
                value: true,
                message: '거주지는 필수 항목이에요.',
              },
            })}
            message={errors.address?.message}
            messageClassName="text-red-500"
          />
        </div>
        <div className="space-y-4">
          <Select
            label="관심 분야"
            options={SELECT_OPTIONS.MY_FIELD}
            id="interests"
            {...register('interests', {
              required: {
                value: true,
                message: '관심분야는 필수 항목이에요.',
              },
            })}
          />
          {errors.interests && (
            <span className="ml-1 mt-1 text-xs text-red-500">
              {errors.interests.message}
            </span>
          )}
          <Input
            id="githubUrl"
            placeholder="https://github.com/kgu-clab"
            className="grow"
            label="Github (선택)"
            inputClassName="text-black"
            {...register('githubUrl')}
          />
          <Textarea
            id="otherActivities"
            placeholder="IT 활동 경험과 지원동기를 자유롭게 기술해주세요."
            className="h-56"
            label="지원 동기 및 활동"
            {...register('otherActivities', {
              required: {
                value: true,
                message: '지원 동기 및 활동은 필수 항목이에요.',
              },
              maxLength: {
                value: OTHER_ACTIVITY_MAX_LENGTH,
                message: `${OTHER_ACTIVITY_MAX_LENGTH}자 이하로 작성해주세요.`,
              },
            })}
          />
          {errors.otherActivities && (
            <span className="ml-1 mt-1 text-xs text-red-500">
              {errors.otherActivities.message}
            </span>
          )}
          <Button
            className="bg-clab-gray w-full font-bold text-white"
            type="submit"
          >
            지원하기
          </Button>
        </div>
      </form>

      {isModalOpen && <Modal body={modalContent} isOpen={isModalOpen} />}
    </>
  );
}
