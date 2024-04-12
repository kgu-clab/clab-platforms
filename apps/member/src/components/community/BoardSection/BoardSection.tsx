import ListButton from '@components/common/ListButton/ListButton';
import MoreButton from '@components/common/MoreButton/MoreButton';
import Section from '@components/common/Section/Section';

import { COMMUNITY_MESSAGE } from '@constants/message';
import { createPath } from '@utils/api';
import { toYYMMDD } from '@utils/date';
import { cn, toDecodeHTMLEntities } from '@utils/string';

import type { CommunityPostItem } from '@type/community';
import type { StrictPropsWithChildren } from '@type/component';
import type { HireItem } from '@type/hire';
import type { NewsItem } from '@type/news';

interface BoardSectionItemProps {
  title: string;
  to: string;
  data: Array<CommunityPostItem | HireItem | NewsItem>;
}

const BoardSection = ({ children }: StrictPropsWithChildren) => {
  return <div className="grid gap-4 text-sm xl:grid-cols-2">{children}</div>;
};
BoardSection.displayName = 'BoardSection';

const BoardSectionItem = ({ title, to, data }: BoardSectionItemProps) => {
  return (
    <Section>
      <Section.Header title={title}>
        <MoreButton to={to} />
      </Section.Header>
      <Section.Body
        className={cn({
          'flex grow flex-col justify-center text-center': data.length === 0,
        })}
      >
        {data.length === 0 ? (
          <p className="text-gray-500">{COMMUNITY_MESSAGE.NO_ARTICLE}</p>
        ) : (
          data.map(({ id, title, createdAt }) => (
            <ListButton key={id} to={createPath(to, id)}>
              <p className="w-full truncate pr-4">
                {toDecodeHTMLEntities(title)}
              </p>
              <p className="text-clab-main-light">{toYYMMDD(createdAt)}</p>
            </ListButton>
          ))
        )}
      </Section.Body>
    </Section>
  );
};
BoardSectionItem.displayName = 'BoardSectionItem';

export { BoardSection, BoardSectionItem };
