import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import { Section } from '@components/common/Section';
import CommunityBoardForm from '@components/community/CommunityBoardForm/CommunityBoardForm';

import { PATH, PATH_NAME } from '@constants/path';

const CommunityWritePage = () => {
  return (
    <Content>
      <Header title={[PATH_NAME.COMMUNITY, '글쓰기']} path={[PATH.COMMUNITY]} />
      <Section>
        <CommunityBoardForm />
      </Section>
    </Content>
  );
};

export default CommunityWritePage;
