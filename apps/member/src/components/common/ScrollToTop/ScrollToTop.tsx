import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';

interface ScrollToTopProps {
  children: React.ReactNode;
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const location = useLocation();

  //레이아웃이 변경되면 가장 위로 스크롤 이동
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

export default ScrollToTop;
