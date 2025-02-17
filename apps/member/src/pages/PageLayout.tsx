import { Suspense } from 'react';
import { Outlet } from 'react-router';

import Footer from '@components/common/Footer/Footer';
import Nav from '@components/common/Nav/Nav';
import ScrollToTop from '@components/common/ScrollToTop/ScrollToTop';
import TextBanner from '@components/common/TextBanner/TextBanner';
import PanelAside from '@components/panels/PanelAside/PanelAside';
import ProtectAuth from '@components/router/ProtectAuth';

export function PageLayout() {
  const banner = true;

  return (
    <ProtectAuth protect>
      <ScrollToTop>
        <Suspense>
          <Nav />
        </Suspense>
        <main className="flex min-h-screen flex-col bg-gray-50 py-14">
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
        <Footer />
      </ScrollToTop>
    </ProtectAuth>
  );
}
