import { Button } from '@clab/design-system';
import { ChangeEvent, useState } from 'react';

import { Input } from '@clab/design-system';
import Section from '@components/common/Section/Section';

interface InputProps {
  name: string;
  cost: string;
  purpose: string;
  url: string;
}

const RequestForm = () => {
  const [input, setInput] = useState<InputProps>({
    name: '',
    cost: '',
    url: '',
    purpose: '',
  });

  const { name, cost, purpose, url } = input;

  const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addComma = (cost: string) => {
    const returnString = cost
      .replace(/,/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return returnString;
  };

  const onClickRequest = () => {
    if (!name || !cost || !purpose || !cost || !url) {
      alert('필수 입력 사항을 확인해주세요');
    } else {
      alert('검토 후 안내드리겠습니다.');
    }
  };

  return (
    <Section>
      <Section.Header title="신청서" />
      <Section.Body className="mt-4 grid gap-2 md:grid-cols-2">
        <Input
          id="name"
          name="name"
          label="품명"
          placeholder="품명을 작성해주세요"
          value={name}
          onChange={onChangeInputs}
        />
        <Input
          id="cost"
          name="cost"
          label="금액"
          inputMode="numeric"
          placeholder="구매 금액을 작성해주세요"
          value={addComma(cost) || cost}
          onChange={onChangeInputs}
        />
        <Input
          id="url"
          name="url"
          label="URL"
          placeholder="구매한 사이트의 URL을 작성해주세요"
          value={url}
          onChange={onChangeInputs}
        />
        <Input
          id="purpose"
          name="purpose"
          label="사유"
          placeholder="요청 사유를 작성해주세요"
          value={purpose}
          onChange={onChangeInputs}
        />
      </Section.Body>
      <Button className="w-full mt-6" onClick={onClickRequest}>
        요청하기
      </Button>
    </Section>
  );
};

export default RequestForm;
