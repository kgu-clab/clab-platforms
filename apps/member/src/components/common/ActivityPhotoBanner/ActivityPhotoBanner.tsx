import Image from '@components/common/Image/Image';

import { useActivityPhoto } from '@hooks/queries';
import { createImageUrl } from '@utils/api';

const ActivityPhotoBanner = () => {
  const { data } = useActivityPhoto();

  if (data.totalItems === 0) {
    return null;
  }

  const { title, date, files } = data.items[0];

  return (
    <div className="relative flex h-60 items-center gap-2 overflow-hidden rounded-lg border">
      <Image
        width="w-full"
        height="h-full"
        src={createImageUrl(files[0].fileUrl)}
        alt={title}
        className="object-cover"
      />
      <div className="to-bg-black-10 pointer-events-none absolute inset-0 size-full rounded-lg bg-gradient-to-t from-black/40 via-black/0" />
      <div className="pointer-events-none absolute bottom-0 whitespace-nowrap p-4 text-start">
        <p className="text-2xl font-bold text-white">{title}</p>
        <p className="font-medium text-white">{date}</p>
      </div>
    </div>
  );
};

export default ActivityPhotoBanner;
