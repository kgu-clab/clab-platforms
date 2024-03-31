import { Button, Input, Checkbox, Tabs } from '@clab/design-system';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { formatComma } from '@utils/math';
import useToast from '@hooks/common/useToast';
import Linker from '@components/common/Linker/Linker';
import Uploader from '@components/common/Uploader/Uploader';
import { FcAnswers, FcMultipleDevices, FcTemplate } from 'react-icons/fc';
import { SELECT_DEFAULT_OPTION } from '@constants/select';
import Loading from '@components/common/Loading/Loading';
import type { SupportRequestDataType } from '@type/support';

const tabsOptions = [
  {
    icon: <FcTemplate size={32} />,
    value: '도서',
  },
  {
    icon: <FcMultipleDevices size={32} />,
    value: '물품',
  },
  {
    icon: <FcAnswers size={32} />,
    value: '기타',
  },
];

interface SupportRequestFormProps {
  isPending: boolean;
  onSubmit: (data: SupportRequestDataType) => void;
}

const SupportRequestForm = ({
  isPending,
  onSubmit,
}: SupportRequestFormProps) => {
  const toast = useToast();
  const [checkList, setCheckList] = useState<boolean[]>([false, false, false]);
  const [formData, setFormData] = useState<SupportRequestDataType>({
    category: tabsOptions[0].value,
    amount: 0,
    content: '',
    account: '',
    file: null,
  });

  const { category, amount, account, content, file } = formData;

  const checkSubmitValidation =
    !checkList.includes(false) && // 체크박스가 모두 체크되어 있을 경우
    category !== SELECT_DEFAULT_OPTION && // 분류가 기본값이 아닐 경우
    amount > 0 && // 금액이 0보다 클 경우
    content.length !== 0 && // 사유가 작성되어 있을 경우
    account.length !== 0 && // 계좌번호가 작성되어 있을 경우
    file; // 파일이 첨부되어 있을 경우
  /**
   * 입력값이 변경될 때마다 상태를 업데이트합니다.
   */
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value.replace(/,/g, '')) : value,
    }));
  }, []);
  /**
   * 분류 선택값이 변경될 때마다 상태를 업데이트합니다.
   */
  const handleTabsChange = useCallback((value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  }, []);
  /**
   * 파일이 첨부될 때마다 상태를 업데이트합니다.
   */
  const handleFileAccepted = useCallback((file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      file,
    }));
  }, []);
  /**
   * 체크박스가 변경될 때마다 상태를 업데이트합니다.
   */
  const handleCheckboxChange = (index: number) => {
    setCheckList((prev) => {
      const next = [...prev];
      next[index] = !prev[index];
      return next;
    });
  };
  /**
   * 폼을 제출할 때 실행되는 이벤트입니다.
   */
  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) {
      return;
    }

    if (!checkSubmitValidation) {
      return toast({
        state: 'error',
        message: '모든 항목을 입력해주세요',
      });
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleOnSubmit} className="space-y-4">
      <Tabs options={tabsOptions} onChange={handleTabsChange} />
      <div className="space-y-2">
        <Input
          id="amount"
          name="amount"
          label="금액"
          inputMode="numeric"
          placeholder="최종 결제 금액을 입력해주세요."
          value={formatComma(amount)}
          onChange={handleInputChange}
        />
        <Input
          id="account"
          name="account"
          label="은행 / 계좌번호"
          placeholder="승인이 되면 해당 계좌로 결제대금을 입금해드려요."
          value={account}
          onChange={handleInputChange}
        />
        <Input
          id="content"
          name="content"
          label="사유"
          placeholder="사용 목적을 상세하게 작성해주세요."
          value={content}
          onChange={handleInputChange}
        />
        <Uploader
          label="증빙 자료"
          accept="image/*"
          onFileAccepted={handleFileAccepted}
        />
        <ul className="text-sm leading-loose">
          <li>
            <Checkbox
              checked={checkList[0]}
              onChange={() => handleCheckboxChange(0)}
              label="해당 요청은 동아리 활동에 필요한 것이며, 동아리 활동과 관련이 없는
              요청은 거절될 수 있어요."
            />
          </li>
          <li>
            <Checkbox
              checked={checkList[1]}
              onChange={() => handleCheckboxChange(1)}
              label="회비 요청은 동아리 활동에 필요한지 여부에 대하여 운영진 회의후에
              승인돼요."
            />
          </li>
          <li>
            <Checkbox
              checked={checkList[2]}
              onChange={() => handleCheckboxChange(2)}
              label="회비를 통해 구매한 물품은 동아리의 소유가 되며, 모든 부원에게 공유
              될 수 있어요."
            />
          </li>
          <li>
            <Linker to="">동아리규칙 알아보기</Linker>
          </li>
        </ul>
        <Button
          type="submit"
          color={checkSubmitValidation ? 'white' : 'red'}
          className="w-full"
        >
          {isPending ? (
            <Loading className="mx-auto" />
          ) : checkSubmitValidation ? (
            '모든 준비가 끝났어요, 신청하기'
          ) : (
            '모든 항목이 입력되어야 해요'
          )}
        </Button>
      </div>
    </form>
  );
};

export default SupportRequestForm;
