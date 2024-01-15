import Button from '@components/common/Button/Button';
import Panel from '@components/common/Panel/Panel';
import { FcBusiness } from 'react-icons/fc';

const AccountPanel = () => {
  return (
    <Panel label="공동계정" icon={<FcBusiness />}>
      <div className="space-y-4 text-sm">
        <div className="space-y-1">
          <p className="font-semibold">🌱 인프런</p>
          <Button color="green" className={'w-full'}>
            사용하기
          </Button>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">💻 잡플래닛</p>
          <Button
            color="blue"
            className="w-full"
            onClick={() => window.open('https://www.jobplanet.co.kr/job')}>
            접속하기
          </Button>
        </div>
      </div>
    </Panel>
  );
};

export default AccountPanel;
