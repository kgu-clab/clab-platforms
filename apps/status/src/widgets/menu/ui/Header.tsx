import Image from 'next/image';

export default function Header() {
  return (
    <div className="flex w-full items-center justify-between py-6">
      <div className="flex items-center gap-x-2">
        <Image
          src="/image/logo_primary.webp"
          className="size-10"
          width={64}
          height={64}
          alt="씨랩 로고"
        />
        <h1 className="text-3xl font-bold">
          C-Lab <span className="font-medium">Status</span>
        </h1>
      </div>
    </div>
  );
}
