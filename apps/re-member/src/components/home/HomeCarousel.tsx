import { clubNewsList, type ClubNews } from "@/shared/mock/club-news";
import { Chip } from "@/components/common";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface HomeCarouselProps {
  items?: ClubNews[];
}

export default function HomeCarousel({
  items = clubNewsList,
}: HomeCarouselProps) {
  const [emblaRef] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })],
  );

  return (
    <div ref={emblaRef} className="overflow-hidden">
      <div className="gap-xl px-xl flex">
        {items.map((item) => (
          <HomeCarouselItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

function HomeCarouselItem({ category, title, description, image }: ClubNews) {
  return (
    <div className="relative h-[300px] w-[330px] flex-none">
      <div className="bg-gray-2 px-2xl py-3xl relative flex h-full w-[330px] flex-col justify-end overflow-hidden rounded-lg">
        <div className="absolute inset-0">
          <img src={image} alt={title} className="h-full w-full object-cover" />
          <div className="bg-linear-to-b absolute inset-0 from-transparent via-transparent to-[rgba(0,0,0,0.51)]" />
        </div>

        <div className="left-2xl absolute top-[147px]">
          <Chip className="border-secondary text-gray-2 border bg-[rgba(1,32,108,0.6)]">
            {category}
          </Chip>
        </div>

        <p className="text-16-medium relative text-white">{title}</p>

        <p className="text-22-bold relative whitespace-pre-line text-white">
          {description}
        </p>
      </div>
    </div>
  );
}
