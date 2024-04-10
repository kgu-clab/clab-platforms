import Image from '@components/common/Image/Image';
import { useActivityPhoto } from '@hooks/queries';
import { createImageUrl } from '@utils/api';

const MainBanner = () => {
  const { data } = useActivityPhoto();

  if (data.items.length === 0) {
    return null;
  }

  const { title, date, files } = data.items[0];

  return (
    <div className="relative flex items-center gap-2 overflow-hidden border rounded-lg h-60">
      <Image
        width="w-full"
        height="h-full"
        src={createImageUrl(files[0].fileUrl)}
        alt={title}
        className="object-cover"
      />
      <div className="absolute inset-0 w-full h-full rounded-lg pointer-events-none to-bg-black-10 bg-gradient-to-t from-black/40 via-black/0" />
      <div className="absolute bottom-0 p-4 pointer-events-none whitespace-nowrap text-start">
        <p className="text-2xl font-bold text-white">{title}</p>
        <p className="font-medium text-white">{date}</p>
      </div>
    </div>
  );
};

export default MainBanner;
