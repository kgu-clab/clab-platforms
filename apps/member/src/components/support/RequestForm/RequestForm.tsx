import Button from '@components/common/Button/Button';
import { ChangeEvent, useState } from 'react';
import FormInput from '../FormInput/FormInput';

interface InputProps {
  name: string;
  date: string;
  purpose: string;
  url: string;
}

const RequestForm = () => {
  const [cost, setCost] = useState('');
  const [input, setInput] = useState<InputProps>({
    name: '',
    date: '',
    purpose: '',
    url: '',
  });

  const { name, date, purpose, url } = input;

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

  const onChangeCost = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const str = value.replace(',', '');
    setCost(str);
  };

  const onClickRequest = () => {
    if (!name || !date || !purpose || !cost || !url) {
      alert('필수 입력 사항을 확인해주세요');
    } else {
      alert('검토 후 안내드리겠습니다.');
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold pb-4">신청서</h1>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        <div className="space-y-4">
          <FormInput
            title="요청자"
            essential={true}
            name="name"
            placeholder="요청하시는 분의 성함을 적어주세요"
            value={name}
            onChange={onChangeInputs}
          />

          <FormInput
            title="신청일시"
            essential={true}
            type="date"
            name="date"
            value={date}
            onChange={onChangeInputs}
          />
          <FormInput
            title="목적"
            essential={true}
            name="purpose"
            placeholder="구매 목적을 적어주세요"
            value={purpose}
            onChange={onChangeInputs}
          />
        </div>

        <div className="space-y-4">
          <FormInput
            title="금액"
            essential={true}
            name="cost"
            placeholder="구매 금액을 적어주세요"
            value={addComma(cost) || cost}
            onChange={(e) => onChangeCost(e)}
          />

          <FormInput
            title="링크"
            essential={true}
            name="url"
            placeholder="구매처 링크를 넣어주세요"
            value={url}
            onChange={onChangeInputs}
          />
          <div className="pt-8">
            <Button className="w-full" onClick={onClickRequest}>
              요청하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
