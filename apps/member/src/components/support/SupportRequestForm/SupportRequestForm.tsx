import { Button } from '@clab/design-system';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { Input } from '@clab/design-system';
import Section from '@components/common/Section/Section';
import { useMembershipFeeMutation } from '@hooks/queries/useMembershipFeeMutation';
import Select from '@components/common/Select/Select';
import { SELECT_OPTIONS } from '@constants/select';
import { formatComma } from '@utils/math';
import useToast from '@hooks/common/useToast';
import Label from '@components/common/Label/Label';
import { DEFAULT } from '@constants/default';
import { FORM_DATA_KEY } from '@constants/api';

const SupportRequestForm = () => {
  const toast = useToast();
  const { membershipFeeMutate } = useMembershipFeeMutation();

  const imageUploader = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState({
    category: DEFAULT.SELECT,
    amount: 0,
    content: '',
  });

  const { category, amount, content } = input;

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setInput((prev) => ({
        ...prev,
        [e.target.name]:
          e.target.name === 'amount'
            ? parseFloat(e.target.value.replace(/,/g, ''))
            : e.target.value,
      }));
    },
    [],
  );

  const onClickRequest = async () => {
    if (
      category === 'none' ||
      !amount ||
      !content ||
      !imageUploader.current?.files?.length
    ) {
      return toast({
        state: 'error',
        message: '신청서 항목을 모두 작성해주세요.',
      });
    }

    const formData = new FormData();
    const files = imageUploader.current?.files[0];
    formData.append(FORM_DATA_KEY, files, encodeURIComponent(files.name));

    membershipFeeMutate({
      body: input,
      multipartFile: imageUploader.current?.files?.length ? formData : null,
    });
  };

  return (
    <Section>
      <Section.Header title="회비 요청" />
      <Section.Body className="grid gap-2 mt-4 md:grid-cols-2">
        <div className="flex flex-col">
          <Label className="mb-1 ml-1 text-xs">분류</Label>
          <Select
            className="w-full"
            name="category"
            options={SELECT_OPTIONS.SUPPORT_FORM}
            value={category}
            onChange={handleInputChange}
          />
        </div>
        <Input
          id="amount"
          name="amount"
          label="금액"
          inputMode="numeric"
          placeholder="구매 금액을 작성해주세요"
          value={formatComma(amount)}
          onChange={handleInputChange}
        />
        <div className="col-span-2">
          <Input
            id="content"
            name="content"
            label="사유"
            placeholder="요청 사유를 상세하게 작성해주세요"
            value={content}
            onChange={handleInputChange}
          />
        </div>
        <Input
          id="membershipFormUploader"
          name="membershipFormUploader"
          type="file"
          label="증빙 자료"
          ref={imageUploader}
          className="col-span-2 border-none"
        />
      </Section.Body>
      <Button className="w-full mt-6" onClick={onClickRequest}>
        요청하기
      </Button>
    </Section>
  );
};

export default SupportRequestForm;
