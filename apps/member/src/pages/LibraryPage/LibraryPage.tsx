import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import LibraryNewBookSection from '@components/library/LibraryNewBookSection/LibraryNewBookSection';
import LibraryOwnBookSection from '@components/library/LibraryOwnBookSection/LibraryOwnBookSection';

const LibraryPage = () => {
  return (
    <Content>
      <Header title="도서관" />
      <LibraryNewBookSection />
      <LibraryOwnBookSection />
    </Content>
  );
};

export default LibraryPage;
