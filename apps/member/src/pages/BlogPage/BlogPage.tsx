import Image from '@components/common/Image/Image';
import Share from '@components/common/Share/Share';
import { ERROR_MESSAGE } from '@constants/message';
import { useBlogDetail } from '@hooks/queries';
import { useParams } from 'react-router-dom';
import { formattedDate } from '@utils/date';
import Content from '@components/common/Content/Content';
import { createImageUrl } from '@utils/api';
import { Section } from '@components/common/Section';
import Header from '@components/common/Header/Header';

const BlogPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) throw new Error(ERROR_MESSAGE.NOT_FOUND);

  const { data } = useBlogDetail(+id);

  if (!data?.id) throw new Error(ERROR_MESSAGE.NOT_FOUND);

  const { imageUrl, title, subTitle, memberId, name, content, createdAt } =
    data;

  return (
    <Content>
      <Header title={['기술 블로그', title]} />
      <Section>
        <Image
          src={createImageUrl(imageUrl)}
          alt={title}
          className="object-cover border rounded-lg"
        />
        <div className="my-6 space-y-2 text-center break-keep">
          <h2 className="text-4xl font-bold text-clab-main">{title}</h2>
          <div className="font-medium text-clab-main-light">
            <p>{subTitle}</p>
            <p>
              {name} ({memberId}) • {formattedDate(createdAt)}
            </p>
          </div>
          <Share className="justify-center" />
        </div>
        <div className="whitespace-pre-wrap break-keep">{content}</div>
      </Section>
    </Content>
  );
};

export default BlogPage;
