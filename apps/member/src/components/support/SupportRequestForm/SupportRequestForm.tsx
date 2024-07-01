import { useEffect } from 'react';

import { Button, Checkbox, Input, Tabs } from '@clab/design-system';
import { AnswersColor, MultipleDevicesColor, TemplateColor } from '@clab/icon';
import { formatComma } from '@clab/utils';

import Linker from '@components/common/Linker/Linker';
import Loading from '@components/common/Loading/Loading';
import Uploader from '@components/common/Uploader/Uploader';

import { SELECT_DEFAULT_OPTION } from '@constants/select';
import useToast from '@hooks/common/useToast';
import { useSupportRequestForm } from '@hooks/useSupportRequestForm';

import type { SupportRequestDataType } from '@type/support';

const TABS_OPTIONS = [
  {
    icon: <TemplateColor width={32} height={32} />,
    value: '도서',
  },
  {
    icon: <MultipleDevicesColor width={32} height={32} />,
    value: '물품',
  },
  {
    icon: <AnswersColor width={32} height={32} />,
    value: '기타',
  },
] as const;

interface SupportRequestFormProps {
  isPending: boolean;
  isSuccess: boolean;
  onSubmit: (data: SupportRequestDataType) => void;
}

const SupportRequestForm = ({
  isPending,
  isSuccess,
  onSubmit,
}: SupportRequestFormProps) => {
  const toast = useToast();
  const {
    formData,
    checkList,
    handleCheckboxChange,
    handleFileAccepted,
    handleInputChange,
    handleTabsChange,
    resetFormData,
  } = useSupportRequestForm();

  const { category, amount, account, content } = formData;
  const validation =
    !checkList.includes(false) && // 체크박스가 모두 체크되어 있을 경우
    formData.category !== SELECT_DEFAULT_OPTION && // 분류가 기본값이 아닐 경우
    formData.amount > 0 && // 금액이 0보다 클 경우
    formData.content.length !== 0 && // 사유가 작성되어 있을 경우
    formData.account.length !== 0 && // 계좌번호가 작성되어 있을 경우
    formData.file; // 파일이 첨부되어 있을 경우

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;
    if (!validation) {
      return toast({
        state: 'error',
        message: '모든 항목을 입력해주세요',
      });
    }
    onSubmit(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      resetFormData();
    }
  }, [isSuccess, resetFormData]);

  return (
    <form onSubmit={handleOnSubmit} className="space-y-4">
      <Tabs
        options={TABS_OPTIONS}
        value={category}
        onChange={handleTabsChange}
      />
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
          isSuccess={isSuccess}
          onFileAccepted={handleFileAccepted}
        />
        <ul className="text-sm leading-loose">
          <li>
            <Checkbox
              id="checkbox-1"
              checked={checkList[0]}
              onChange={() => handleCheckboxChange(0)}
              label="해당 요청은 동아리 활동에 필요한 것이며, 동아리 활동과 관련이 없는
              요청은 거절될 수 있어요."
            />
          </li>
          <li>
            <Checkbox
              id="checkbox-2"
              checked={checkList[1]}
              onChange={() => handleCheckboxChange(1)}
              label="회비 요청은 동아리 활동에 필요한지 여부에 대하여 운영진 회의후에
              승인돼요."
            />
          </li>
          <li>
            <Checkbox
              id="checkbox-3"
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
          color={validation ? 'green' : 'primary'}
          className="w-full"
          disabled={isPending || !validation}
        >
          {isPending ? (
            <Loading className="mx-auto" />
          ) : validation ? (
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
