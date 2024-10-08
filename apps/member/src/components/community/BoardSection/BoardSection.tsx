import { Grid } from '@clab-platforms/design-system';
import { cn, createURL, toDecodeHTMLEntities } from '@clab-platforms/utils';

import CommentCounter from '@components/common/CommentCounter/CommentCounter';
import ListButton from '@components/common/ListButton/ListButton';
import MoreButton from '@components/common/MoreButton/MoreButton';
import Section from '@components/common/Section/Section';

import { COMMUNITY_MESSAGE } from '@constants/message';
import { toYYMMDD } from '@utils/date';

import type {
  CommunityHireBoard,
  CommunityNewsBoard,
  CommunityPostItem,
} from '@type/community';
import type { StrictPropsWithChildren } from '@type/component';

interface BoardSectionItemProps {
  title: string;
  to: string;
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
          data.map(({ id, title, commentCount, createdAt }) => (
            <ListButton key={id} to={createURL(to, id)}>
              <p className="line-clamp-1 w-full pr-4">
                {toDecodeHTMLEntities(title)}
                <CommentCounter>{commentCount}</CommentCounter>
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
