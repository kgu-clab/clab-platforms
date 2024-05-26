import { useService } from '@hooks/useService';
import { type ServiceCode } from '@utils/service';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  code: ServiceCode;
}

const ServiceInformation = ({ code }: Props) => {
  const service = useService(code);

  if (!service?.name) {
    return notFound();
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
