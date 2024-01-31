import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import LibraryNewBookSection from '@components/library/LibraryNewBookSection/LibraryNewBookSection';
import LibraryOwnBookSection from '@components/library/LibraryOwnBookSection/LibraryOwnBookSection';
import { Button } from '@clab/design-system';

const LibraryPage = () => {
  return (
    <Content>
      <Header title="도서관">
        <Button size="sm">도서 신청</Button>
      </Header>
      <LibraryNewBookSection />
      <LibraryOwnBookSection />
    </Content>
  );
};

export default LibraryPage;
