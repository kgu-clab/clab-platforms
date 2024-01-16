import Image from '../Image/Image';

interface ImageBannerProps {
  data: {
    image: string;
    title: string;
    date: string;
  };
}

const ImageBanner = ({ data }: ImageBannerProps) => {
  const { image, title, date } = data;

  return (
    <div className="relative flex h-60 items-center gap-2 overflow-hidden rounded-lg border">
      <Image
        width="w-full"
        height="h-full"
        src={image}
        alt={title}
        className="object-cover"
      />
      <div className="to-bg-black-10 pointer-events-none absolute inset-0 h-full w-full rounded-lg bg-gradient-to-t from-black/40 via-black/0" />
      <div className="pointer-events-none absolute bottom-0 whitespace-nowrap p-4 text-start">
        <p className="text-2xl font-bold text-white">{title}</p>
        <p className="font-medium text-white">{date}</p>
      </div>
    </div>
  );
};

export default ImageBanner;
