import { useCallback, useState } from 'react';

import { Button, Input } from '@clab/design-system';

import Textarea from '@components/common/Textarea/Textarea';

import useToast from '@hooks/common/useToast';
import { useBoardWriteMutation } from '@hooks/queries';

const AddNotice = () => {
  const toast = useToast();
  const { boardWriteMutate } = useBoardWriteMutation();

  const [noticeInfo, setNoticeInfo] = useState({
    title: '',
    content: '',
  });

  const handleInputsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNoticeInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmitClick = useCallback(() => {
    if (!noticeInfo.title || !noticeInfo.content) {
      return toast({
        state: 'error',
        message: '모든 항목을 입력해주세요.',
      });
    }
    boardWriteMutate({
      ...noticeInfo,
      category: 'notice',
      wantAnonymous: true,
    });
  }, [boardWriteMutate, noticeInfo, toast]);

  return (
    <div className="space-y-2">
      <Input
        id="title"
        name="title"
        placeholder="제목을 입력해주세요"
        label="제목"
        value={noticeInfo.title}
        onChange={handleInputsChange}
      />
      <Textarea
        id="content"
        name="content"
        placeholder="내용을 입력해주세요"
        label="내용"
        maxLength={4000}
        value={noticeInfo.content}
        onChange={handleInputsChange}
      />
      <Button className="w-full" onClick={handleSubmitClick}>
        등록
      </Button>
    </div>
  );
};

export default AddNotice;
