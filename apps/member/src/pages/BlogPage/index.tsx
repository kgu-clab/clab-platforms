import { useParams } from 'react-router-dom';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Image from '@components/common/Image/Image';
import { Section } from '@components/common/Section';
import Share from '@components/common/Share/Share';

import { ERROR_MESSAGE } from '@constants/message';
import { useBlogDetail } from '@hooks/queries';
import { createImageUrl } from '@utils/api';
import { formattedDate } from '@utils/date';

export default function BlogPage() {
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
          className="rounded-lg border object-cover"
        />
        <div className="my-6 space-y-2 break-keep text-center">
          <h2 className="text-clab-main text-4xl font-bold">{title}</h2>
          <div className="text-clab-main-light font-medium">
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
}
