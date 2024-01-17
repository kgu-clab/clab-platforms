import Card from '@components/common/Card/Card';
import Image from '@components/common/Image/Image';

import newsList from '@mocks/data/newsList.json';

const NewsCardList = () => {
  return (
    <Card>
      <Card.Header title="최근 동아리 소식은?" />
      <Card.Body className="flex gap-2 overflow-scroll scrollbar-hide">
        {newsList.slice(0, 4).map(({ id, title, image }) => (
          <div
            key={id}
            className="cursor-pointer space-y-4 rounded-lg p-2 transition hover:bg-gray-100 items-center flex flex-col"
          >
            <Image
              src={image}
              alt={title}
              width="w-48"
              height="h-48"
              className="rounded-lg object-cover border"
            />
            <p className="break-keep text-center hover:underline">{title}</p>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default NewsCardList;
