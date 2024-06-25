import { cn } from '@clab/utils';

import { SERVICE_LIST } from '@/src/shared';
import Title from '@/src/shared/ui/Title';

import ServiceStatusItem from './ServiceStatusItem';

function StatusBanner({ status }: { status: boolean }) {
  return (
    <div
      className={cn(
        'w-full rounded-md px-8 py-4 text-lg font-semibold text-white',
        status ? 'bg-green-500' : 'bg-red-500',
      )}
    >
      {status
        ? '현재 서비스가 정상적으로 운영되고 있습니다.'
        : '현재 일부 서비스가 일시 중단되었습니다.'}
    </div>
  );
}

export default async function CurrentStatus() {
  const status = await fetch(
    process.env.NODE_ENV !== 'production'
      ? process.env.DEVELOP_SERVER_URL ?? ''
      : process.env.PRODUCTION_SERVER_URL ?? '',
  )
    .then((res) => res.status === 404)
    .catch(() => false);

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
            status={status}
          />
        ))}
      </ul>
    </div>
  );
}
