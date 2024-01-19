interface PostTitleSectionProps {
  title: string;
}

const PostTitleSection = ({ title }: PostTitleSectionProps) => {
  return <h1 className="text-3xl p-4">{title}</h1>;
};

export default PostTitleSection;
