import { SERVICE_LIST, SERVICE_STATUS_LIST, ServiceList } from '@/src/shared';
import Title from '@/src/shared/ui/Title';

import ServiceStatusItem from './ServiceStatusItem';

interface CurrentStatusProps {
  status: boolean;
}

function StatusBanner({ status }: { status: boolean }) {
  return (
    <div
      className={`w-full rounded-md ${status ? 'bg-green-600' : 'bg-red-500'} px-8 py-4 text-lg text-white`}
    >
      {status
        ? '현재 서비스가 정상적으로 운영되고 있습니다.'
        : '현재 일부 서비스가 일시 중단되었습니다.'}
    </div>
  );
}

export default function CurrentStatus({ status }: CurrentStatusProps) {
  return (
    <div className="flex w-full flex-col gap-y-10">
      <StatusBanner status={status} />
      <div className="w-full">
        <Title text="서비스 목록" />
        <div className="mt-5 text-right text-sm text-gray-400">
          클릭을 통해 해당 서비스로 이동하실 수 있습니다.
        </div>
      </div>
      <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        {Object.entries(SERVICE_LIST).map(([serviceName, serviceURL]) => (
          <ServiceStatusItem
            serviceName={serviceName}
            serviceURL={serviceURL}
            status={SERVICE_STATUS_LIST[serviceName as ServiceList]}
          />
        ))}
      </ul>
    </div>
  );
}
