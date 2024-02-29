import { Button } from '@clab/design-system';
import { ChangeEvent, useRef, useState } from 'react';

import { Input } from '@clab/design-system';
import Section from '@components/common/Section/Section';
import { useMembershipFeeMutation } from '@hooks/queries/useMembershipFeeMutation';
import { MembershipFeeType } from '@type/membershipFee';

const RequestForm = () => {
  const { membershipFeeMutate } = useMembershipFeeMutation();
  const imageUploader = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<MembershipFeeType>({
    category: '',
    amount: 0,
    content: '',
  });

  const { category, amount, content } = input;

  const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === 'amount'
          ? parseFloat(e.target.value.replace(/,/g, ''))
          : e.target.value,
    }));
  };

  const addComma = (amount: number) => {
    if (!amount) return '';
    const returnString = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return returnString;
  };

  const onClickRequest = async () => {
    if (!category || !amount || !content) {
      alert('필수 입력 사항을 확인해주세요');
    } else {
      if (imageUploader.current?.files?.length) {
        const files = imageUploader.current?.files[0];
        const formData = new FormData();
        formData.append('multipartFile', files, encodeURIComponent(files.name));
        membershipFeeMutate({ body: input, multipartFile: formData });
        if (imageUploader.current) {
          imageUploader.current.value = '';
        }
      }
    }
    setInput({
      category: '',
      amount: 0,
      content: '',
    });
  };

  return (
    <Section>
      <Section.Header title="신청서" />
      <Section.Body className="grid gap-2 mt-4 md:grid-cols-2">
        <Input
          id="category"
          name="category"
          label="분류"
          placeholder="신청 분류를 작성해주세요"
          value={category}
          onChange={onChangeInputs}
        />
        <Input
          id="amount"
          name="amount"
          label="금액"
          inputMode="numeric"
          placeholder="구매 금액을 작성해주세요"
          value={addComma(amount)}
          onChange={onChangeInputs}
        />
        <Input
          id="content"
          name="content"
          label="사유"
          placeholder="요청 사유를 작성해주세요"
          value={content}
          onChange={onChangeInputs}
        />
        <Input
          id="membershipFormUploader"
          name="membershipFormUploader"
          type="file"
          label="증빙 자료"
          ref={imageUploader}
          className="border-none"
        />
      </Section.Body>
      <Button className="w-full mt-6" onClick={onClickRequest}>
        요청하기
      </Button>
    </Section>
  );
};

export default RequestForm;
