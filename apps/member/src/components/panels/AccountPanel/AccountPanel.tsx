import Button from '@components/common/Button/Button';
import Panel from '@components/common/Panel/Panel';
import { ButtonColorType } from '@type/button';
import { useState } from 'react';
import { FcBusiness } from 'react-icons/fc';

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
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Panel>
      <Panel.Header
        icon={<FcBusiness />}
        label="공동계정"
        isOpen={open}
        onClick={handleOpen}
      />
      <Panel.Body className="space-y-2" isOpen={open}>
        <AccountButton label="🌱 인프런" buttonColor="green">
          사용하기
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
