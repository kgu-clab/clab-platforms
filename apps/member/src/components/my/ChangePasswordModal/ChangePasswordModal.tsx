import React, { useState } from 'react';

import { Input } from '@clab/design-system';
import { cn } from '@clab/utils';

import Modal from '@components/common/Modal/Modal';

import useModal from '@hooks/common/useModal';
import useToast from '@hooks/common/useToast';
import { useUserInfoMutation } from '@hooks/queries';

interface NewPasswordType {
  password: string;
  passwordCheck: string;
}

interface ChangePasswordModalProps {
  memberId: string;
}

const ChangePasswordModal = ({ memberId }: ChangePasswordModalProps) => {
  const { closeModal } = useModal();
  const toast = useToast();
  const { userInfoMutate } = useUserInfoMutation();

  const [newPassword, setNewPassword] = useState<NewPasswordType>({
    password: '',
    passwordCheck: '',
  });

  const { password, passwordCheck } = newPassword;
  const isPasswordValid = password === passwordCheck;
  const isPasswordEmpty = password === '' || passwordCheck === '';

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({ ...prev, [name]: value }));
  };

  const onClickChangePasswordAccept = () => {
    const { password, passwordCheck } = newPassword;
    if (password === '' || passwordCheck === '') {
      return toast({
        state: 'error',
        message: '새로운 비밀번호를 입력해주세요.',
      });
    }
    if (password !== passwordCheck) {
      return toast({
        state: 'error',
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
    userInfoMutate({
      id: memberId,
      body: { password: password },
    });
    closeModal();
  };

  return (
    <Modal>
      <Modal.Header>비밀번호 변경</Modal.Header>
      <Modal.Body className="space-y-2">
        <Input
          id="새로운 비밀번호"
          label="새로운 비밀번호"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Input
          id="비밀번호 확인"
          label="비밀번호 확인"
          type="password"
          name="passwordCheck"
          value={passwordCheck}
          onChange={handlePasswordChange}
        />
        <p
          className={cn('pt-2 text-center', {
            'text-red-500': !isPasswordValid || isPasswordEmpty,
          })}
        >
          {isPasswordEmpty
            ? '새로운 비밀번호를 입력해주세요.'
            : isPasswordValid
              ? '비밀번호가 일치해요.'
              : '비밀번호가 일치하지 않아요.'}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button color="orange" onClick={onClickChangePasswordAccept}>
          변경
        </Modal.Button>
        <Modal.Button color="gray" onClick={closeModal}>
          취소
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
