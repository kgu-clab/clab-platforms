import { Outlet } from 'react-router-dom';
import Footer from '@components/common/Footer/Footer';
import Nav from '@components/common/Nav/Nav';
import ScrollToTop from '@components/common/ScrollToTop/ScrollToTop';
import PanelAside from '@components/panels/PanelAside/PanelAside';
import ProtectAuth from '@components/router/ProtectAuth';

const View = () => {
  const banner = true;

  return (
    <main className="min-h-screen pb-10 m-nav bg-gray-50">
      {banner && (
        <div className="py-4 text-xl font-semibold text-center">
          <h2 className="inline-block font-bold text-transparent bg-gradient-to-r from-sky-600 via-indigo-500 to-purple-500 bg-clip-text">
            OPEN-BETA
          </h2>
          <p className="flex justify-center gap-2 text-xs text-gray-500">
            현재 불안정하거나 구현되지 않는 기능이 있을 수 있습니다.
          </p>
        </div>
      )}
      <div className="flex gap-8 section">
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
