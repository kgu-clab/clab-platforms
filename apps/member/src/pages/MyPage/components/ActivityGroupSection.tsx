import EmptyBox from '@components/common/EmptyBox/EmptyBox';
import Pagination from '@components/common/Pagination/Pagination';
import PostCard from '@components/common/PostCard/PostCard';
import Section from '@components/common/Section/Section';

import { MY_MESSAGE } from '@constants/message';
import { PATH_FINDER } from '@constants/path';
import { usePagination } from '@hooks/common/usePagination';
import { useMyActivityGroupMember } from '@hooks/queries';

export function ActivityGroupSection() {
  const { page, size, handlePageChange } = usePagination({ defaultSize: 4 });
  const { data } = useMyActivityGroupMember({
    page,
    size: 4,
  });

  return (
    <Section>
      <Section.Header title="나의 활동" />
      <Section.Body className="scrollbar-hide flex gap-2 overflow-scroll">
        {data.items.length === 0 ? (
          <EmptyBox className="grow">{MY_MESSAGE.NO_ACTIVITY}</EmptyBox>
        ) : (
          <div className="flex w-full flex-col">
            <div className="flex">
              {data.items.map((activityGroup) => (
                <PostCard
                  key={activityGroup.id}
                  to={PATH_FINDER.ACTIVITY_DETAIL(activityGroup.id)}
                  imageUrl={activityGroup.imageUrl}
                  title={activityGroup.name}
                  subTitle={activityGroup.subject}
                />
              ))}
            </div>
            <Pagination
              className="mx-auto"
              page={page}
              postLimit={size}
              totalItems={data.totalItems}
              onChange={handlePageChange}
            />
          </div>
        )}
      </Section.Body>
    </Section>
  );
}
