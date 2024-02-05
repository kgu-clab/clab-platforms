import { Outlet } from 'react-router-dom';
import Footer from '@components/common/Footer/Footer';
import Nav from '@components/common/Nav/Nav';
import ScrollToTop from '@components/common/ScrollToTop/ScrollToTop';
import PanelAside from '@components/panels/PanelAside/PanelAside';
import classNames from 'classnames';
import ProtectAuth from '@components/router/ProtectAuth';

const View = () => {
  const mockBanner = {
    banner: true,
    message: '500,000원을 후원했습니다.',
    name: '이석현 (201912023)',
  };

  const { banner, message, name } = mockBanner;

  return (
    <main
      className={classNames('m-nav min-h-screen bg-gray-50 pb-10', {
        'pt-10': banner === false,
      })}
    >
      {banner && (
        <div className="py-4 text-center text-xl font-semibold">
          <h1>&quot;{message}&quot;</h1>
          <p className="flex justify-center gap-2 text-xs text-gray-500">
            {name}
          </p>
        </div>
      )}
      <div className="section flex gap-8">
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
