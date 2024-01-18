import Image from '@components/common/Image/Image';

interface PostProfileSectionProps {
  sort?: string;
  image: string;
  writer?: string;
  createAt: string;
}

const PostProfileSection = ({
  sort,
  image,
  writer,
  createAt,
}: PostProfileSectionProps) => {
  return (
    <div>
      {sort !== 'hire' && sort !== 'news' && (
        <div className="flex px-4">
          <Image
            className="rounded-full"
            width={10}
            height={10}
            src={image}
            alt="profile"
          />
          <div className="ml-2 text-sm">
            <p className="font-bold">{writer}</p>
            <p>{createAt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostProfileSection;
