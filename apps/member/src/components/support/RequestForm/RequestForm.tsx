import Button from '@components/common/Button/Button';
import Input from '@components/common/Input/Input';
import { ChangeEvent, useState } from 'react';

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
    const returnString = cost?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
          <div className="space-y-1">
            <label className="label">
              <p className="label-text">
                요청자
                <span className="text-sm text-red-500">*</span>
              </p>
            </label>
            <div className="flex">
              <Input
                type="text"
                placeholder="요청하는 분의 성함을 적어주세요"
                className="grow"
                name="name"
                value={name}
                onChange={onChangeInputs}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="label">
              <p className="label-text">
                신청 일시
                <span className="text-sm text-red-500">*</span>
              </p>
            </label>
            <div className="flex">
              <Input
                type="date"
                className="grow"
                name="date"
                value={date}
                onChange={onChangeInputs}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="label">
              <p className="label-text">
                목적
                <span className="text-sm text-red-500">*</span>
              </p>
            </label>
            <div className="flex">
              <Input
                type="text"
                placeholder="구매 목적을 적어주세요"
                className="grow"
                name="purpose"
                value={purpose}
                onChange={onChangeInputs}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="label">
              <p className="label-text">
                금액
                <span className="text-sm text-red-500">*</span>
              </p>
            </label>
            <div className="flex">
              <Input
                type="text"
                placeholder="구매 금액을 적어주세요"
                className="grow"
                name="cost"
                value={addComma(cost) || cost}
                onChange={(e) => onChangeCost(e)}
              />
            </div>
          </div>

          <div className="space-y-1 pb-8">
            <label className="label">
              <p className="label-text">
                링크
                <span className="text-sm text-red-500">*</span>
              </p>
            </label>
            <div className="flex">
              <Input
                type="text"
                placeholder="구매처 링크를 넣어주세요"
                className="grow"
                name="url"
                value={url}
                onChange={onChangeInputs}
              />
            </div>
          </div>

          <Button className="w-full" onClick={onClickRequest}>
            요청하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
