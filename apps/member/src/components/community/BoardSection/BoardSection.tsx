import { Grid } from '@clab-platforms/design-system';
import { cn, createURL, toDecodeHTMLEntities } from '@clab-platforms/utils';

import CommentCounter from '@components/common/CommentCounter/CommentCounter';
import ListButton from '@components/common/ListButton/ListButton';
import MoreButton from '@components/common/MoreButton/MoreButton';
import Section from '@components/common/Section/Section';

import { COMMUNITY_MESSAGE } from '@constants/message';
import { PATH_FINDER } from '@constants/path';
import { toKoreaISOString, toYYMMDD } from '@utils/date';

import type {
  CommunityHireBoard,
  CommunityNewsBoard,
  CommunityPostItem,
} from '@type/community';
import type { StrictPropsWithChildren } from '@type/component';

interface BoardSectionItemProps {
  title: string;
  to?: string;
  data: Array<CommunityPostItem | CommunityHireBoard | CommunityNewsBoard>;
}

const BoardSection = ({ children }: StrictPropsWithChildren) => {
  return (
    <Grid gap="md" className="text-sm md:grid-cols-2">
      {children}
    </Grid>
  );
};
BoardSection.displayName = 'BoardSection';

const BoardSectionItem = ({ title, to, data }: BoardSectionItemProps) => {
  const isCommunityPostItem = (
    item: CommunityPostItem | CommunityHireBoard | CommunityNewsBoard,
  ): item is CommunityPostItem => {
    return (item as CommunityPostItem).category !== undefined;
  };

  const handleURL = (id: number, index: number, to?: string) => {
    const item = data[index];

    if (to) return createURL(to, id);
    else if (isCommunityPostItem(item))
      return createURL(PATH_FINDER.COMMUNITY_DETAIL(item.category), id);
  };

  return (
    <Section>
      <Section.Header
        className={title === 'HOT' ? 'underline underline-offset-4' : ''}
        title={title}
      >
        {to && <MoreButton to={to} />}
      </Section.Header>
      <Section.Body
        className={cn({
          'flex grow flex-col justify-center text-center': data.length === 0,
        })}
      >
        {data.length === 0 ? (
          <p className="text-gray-500">{COMMUNITY_MESSAGE.NO_ARTICLE}</p>
        ) : (
          data.map(({ id, title, commentCount, createdAt }, index) => (
            <ListButton key={id} to={handleURL(id, index, to)}>
              <p className="line-clamp-1 w-full pr-4">
                {toDecodeHTMLEntities(title)}
                <CommentCounter>{commentCount}</CommentCounter>
              </p>
              <p className="text-clab-main-light">
                {toYYMMDD(toKoreaISOString(createdAt))}
              </p>
            </ListButton>
          ))
        )}
      </Section.Body>
    </Section>
  );
};
BoardSectionItem.displayName = 'BoardSectionItem';

export { BoardSection, BoardSectionItem };
