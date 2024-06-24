import Image from 'next/image';
import Link from 'next/link';

interface StatusItemProps {
  serviceName: string;
  serviceURL: string;
  status: boolean;
}

function StatusTag({ status }: { status: boolean }) {
  return (
    <div
      className={`w-fit rounded-md ${status ? 'bg-green-600' : 'bg-red-500'} px-2 py-1 text-center text-sm text-white`}
    >
      {status ? '서비스 중' : '서비스 일시 중단'}
    </div>
  );
}

export default function StatusItem({
  serviceName,
  serviceURL,
  status,
}: StatusItemProps) {
  return (
    <li className="flex flex-col items-center overflow-hidden rounded-lg border shadow-xl transition-all hover:scale-105">
      <Link href={serviceURL} target="_blank" className="w-full">
        <div className="flex w-full justify-center border-b bg-gray-50 p-10">
          <Image
            className="h-40"
            width={200}
            height={200}
            src="/image/logo.webp"
            alt="C-LAB 로고"
          />
        </div>
        <div className="w-full p-6">
          <p className="mb-2 text-xl">{serviceName}</p>
          <StatusTag status={status} />
        </div>
      </Link>
    </li>
  );
}
