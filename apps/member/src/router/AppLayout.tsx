import { Outlet } from 'react-router-dom';
import Footer from '@components/common/Footer/Footer';
import Nav from '@components/common/Nav/Nav';
import ScrollToTop from '@components/common/ScrollToTop/ScrollToTop';
import PanelAside from '@components/panels/PanelAside/PanelAside';
import ProtectAuth from '@components/router/ProtectAuth';
import TextBanner from '@components/common/TextBanner/TextBanner';

const View = () => {
  const banner = true;

  return (
    <main className="flex flex-col min-h-screen py-14 bg-gray-50">
      {banner && (
        <TextBanner
          label="OPEN-BETA"
          description="현재 불안정하거나 구현되지 않는 기능이 있을 수 있습니다."
        />
      )}
      <div className="container flex gap-8">
        <PanelAside />
        <Outlet />
      </div>
    </main>
  );
};

const AppLayout = () => {
  return (
    <ProtectAuth protect>
      <ScrollToTop>
        <Nav />
        <View />
        <Footer />
      </ScrollToTop>
    </ProtectAuth>
  );
};

export default AppLayout;
