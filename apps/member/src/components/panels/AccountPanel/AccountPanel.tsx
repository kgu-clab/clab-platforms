import Panel from '@components/common/Panel/Panel';
import { useEffect, useState } from 'react';
import { FcBusiness } from 'react-icons/fc';
import { Button, Input, type ButtonColorType } from '@clab/design-system';
import { useSharedAccountsUsageMutation } from '@hooks/queries/useSharedAccountsUsageMutation';
import useModal from '@hooks/common/useModal';
import { useSharedAccountsUsage } from '@hooks/queries/useSharedAccountsUsage';
import Select from '@components/common/Select/Select';
import classNames from 'classnames';
import { useMyProfile } from '@hooks/queries/useMyProfile';
import { useSharedAccounts } from '@hooks/queries/useSharedAccounts';
import dayjs from 'dayjs';
import { useSharedAccountsChangeStatusMutation } from '@hooks/queries/useSharedAccountsChangeStatusMutation';
import { formattedDate } from '@utils/date';
import { SELECT_OPTIONS } from '@constants/select';

interface AccountButtonProps {
  label: string;
  buttonColor: ButtonColorType;
  onClick?: () => void;
  children?: React.ReactNode;
}

const AccountButton = ({
  label,
  buttonColor,
  onClick,
  children,
}: AccountButtonProps) => {
  return (
    <div className="space-y-2">
      <p className="font-semibold">{label}</p>
      <Button color={buttonColor} className="w-full" onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};

const AccountPanel = () => {
  const { openModal } = useModal();
  const { sharedAccountsUsageMutate } = useSharedAccountsUsageMutation();
  const { sharedAccountsStatusMutate } =
    useSharedAccountsChangeStatusMutation();
  const { data: accountUsageList } = useSharedAccountsUsage();
  const { data: accountData } = useSharedAccounts();
  const { data: myProfile } = useMyProfile();

  const [open, setOpen] = useState(true);
  const [selectedButton, setSelectedButton] = useState<string>('');

  // 공동계정 이용 내역 중 현재 인프런을 사용중인 사람
  const inflearnLastUse = accountUsageList.items
    .filter((item) => item.platformName === '인프런')
    .find((item) => item.status === 'IN_USE');
  // 인프런 계정 정보
  const inflearnData = accountData.items.find(
    (account) => account.platformName === '인프런',
  );
  const inflearnInuse = inflearnData?.inUse;
  // 현재 인프런을 사용 중인 멤버와 사용자가 같은 사람인지 확인
  const inflearnInuseUser =
    inflearnLastUse && inflearnLastUse.memberId === myProfile.id;

  const handleOpen = () => {
    setOpen(!open);
  };

  const clickInflearn = () => {
    const now = dayjs();
    let selectedTime: number = 1;
    const today = dayjs().format('YYYY-MM-DD');

    openModal({
      title:
        inflearnInuseUser && inflearnInuse ? '이용 취소/완료하기' : '사용하기',
      content:
        inflearnInuseUser && inflearnInuse ? (
          <div className="flex flex-col space-y-2">
            <Button
              className={classNames('w-full', {
                'bg-slate-600 text-white': selectedButton === 'CANCELED',
              })}
              onClick={() => setSelectedButton('CANCELED')}
            >
              이용 취소
            </Button>
            <Button
              className={classNames('w-full', {
                'bg-slate-600 text-white': selectedButton === 'COMPLETED',
              })}
              onClick={() => setSelectedButton('COMPLETED')}
            >
              이용 완료
            </Button>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            {inflearnInuse && (
              <p>
                예약만 가능해요! {formattedDate(inflearnLastUse?.endTime || '')}
                까지 사용될 예정이에요.
              </p>
            )}
            {!inflearnInuse && (
              <Button
                className={classNames('w-full', {
                  'bg-slate-600 text-white': selectedButton === 'now',
                })}
                onClick={() => setSelectedButton('now')}
              >
                바로 사용하기
              </Button>
            )}
            <Button
              className={classNames('w-full', {
                'bg-slate-600 text-white': selectedButton === 'reserve',
              })}
              onClick={() => setSelectedButton('reserve')}
            >
              예약하기
            </Button>
            {selectedButton === 'reserve' && (
              <Input type="time" id="reserveTime" />
            )}
            <Select
              className="w-full"
              options={SELECT_OPTIONS.ACCOUNT_PANEL}
              onChange={(e) => (selectedTime = Number(e.target.value))}
            />
          </div>
        ),
      accept: {
        text:
          inflearnInuseUser && inflearnInuse
            ? '이용 취소/완료하기'
            : '사용하기',
        onClick: () => {
          if (inflearnInuseUser && inflearnInuse) {
            sharedAccountsStatusMutate({
              usageId: inflearnLastUse.id,
              status: selectedButton,
            });
          } else if (inflearnData) {
            const reserveTimeElement = document.getElementById(
              'reserveTime',
            ) as HTMLInputElement;
            const startTime =
              selectedButton === 'now'
                ? null
                : String(
                    dayjs(
                      `${today}T${reserveTimeElement?.value}:00.000Z`,
                    ).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                  );
            const endTime =
              selectedButton === 'now'
                ? now
                    .add(selectedTime, 'hour')
                    .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                : dayjs(startTime)
                    .add(selectedTime, 'hour')
                    .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
            sharedAccountsUsageMutate({
              sharedAccountId: inflearnData.id,
              startTime: startTime,
              endTime: String(endTime),
            });
          }
          setSelectedButton('');
        },
      },
    });
  };

  useEffect(() => {
    if (selectedButton !== '') clickInflearn();
  }, [selectedButton]);

  return (
    <Panel>
      <Panel.Header
        icon={<FcBusiness />}
        label="공동계정"
        isOpen={open}
        onClick={handleOpen}
      />
      <Panel.Body className="space-y-2" isOpen={open}>
        <AccountButton
          label="🌱 인프런"
          buttonColor="green"
          onClick={clickInflearn}
        >
          {inflearnInuse && inflearnInuseUser
            ? '이용 취소/완료하기'
            : '사용하기'}
        </AccountButton>
        <AccountButton
          label="💻 잡플래닛"
          buttonColor="blue"
          onClick={() => window.open('https://www.jobplanet.co.kr/job')}
        >
          사용하기
        </AccountButton>
      </Panel.Body>
    </Panel>
  );
};

export default AccountPanel;
