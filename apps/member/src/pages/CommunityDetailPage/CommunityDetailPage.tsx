import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import CommunityPostsSection from '@components/community/CommunityPostsSection/CommunityPostsSection';
import CommunityWriteButton from '@components/community/CommunityWriteButton/CommunityWriteButton';

import { ERROR_MESSAGE } from '@constants/message';
import { PATH, PATH_NAME } from '@constants/path';
import { categoryToTitle, isCommunityCategoryType } from '@utils/community';

import type { CommunityCategoryType } from '@type/community';

const CommunityDetailPage = () => {
  const { type } = useParams<{ type: CommunityCategoryType }>();

  if (!type || !isCommunityCategoryType(type)) {
    throw new Error(ERROR_MESSAGE.NOT_FOUND);
  }

  return (
    <Content>
      <Header
        title={[PATH_NAME.COMMUNITY, categoryToTitle(type)]}
        path={[PATH.COMMUNITY]}
      >
        <CommunityWriteButton />
      </Header>
      <Suspense>
        <CommunityPostsSection type={type} />
      </Suspense>
    </Content>
  );
};

export default CommunityDetailPage;
