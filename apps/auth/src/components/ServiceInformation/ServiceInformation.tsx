'use client';

import { useService } from '@hooks/useService';
import Link from 'next/link';

const ServiceInformation = () => {
  const service = useService();

  if (!service) {
    return (
      <p className="text-center font-semibold text-red-500">
        해당 서비스를 찾을 수 없어요.
      </p>
    );
  }

  return (
    <div className="font-medium">
      <span>C-Lab 계정으로&nbsp;</span>
      <Link
        href={service.url}
        className="font-semibold text-sky-500 hover:underline"
        target="_blank"
      >
        {service.name}
      </Link>
      <span>&nbsp;계속하기</span>
    </div>
  );
};

export default ServiceInformation;
