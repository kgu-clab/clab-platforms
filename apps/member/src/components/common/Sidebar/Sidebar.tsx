import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Menubar } from '@clab-platforms/design-system';
import { CloseOutline, MenuOutline } from '@clab-platforms/icon';
import { cn } from '@clab-platforms/utils';

import { PATH } from '@constants/path';
import { ROLE_LEVEL } from '@constants/state';
import { useMyProfile } from '@hooks/queries';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const pathName = location.pathname;

  const { data } = useMyProfile();

  const handleMenubarItemClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <button className="md:hidden" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? (
          <CloseOutline width={20} height={20} />
        ) : (
          <MenuOutline width={20} height={20} />
        )}
      </button>
      <div
        ref={sidebarRef}
        className={cn(
          `fixed inset-x-0 top-14 -z-10 w-full transform bg-white transition duration-300 ease-in-out md:hidden`,
          isOpen ? 'translate-y-0 border-b' : '-translate-y-full',
        )}
      >
        <Menubar className="container flex flex-col gap-6 pb-6 pt-4">
          <Menubar.Item
            selected={pathName === PATH.MAIN}
            onClick={() => handleMenubarItemClick(PATH.MAIN)}
          >
            홈
          </Menubar.Item>
          <Menubar.Item
            selected={pathName.startsWith(PATH.CALENDER)}
            onClick={() => handleMenubarItemClick(PATH.CALENDER)}
          >
            일정
          </Menubar.Item>
          <Menubar.Item
            selected={pathName.startsWith(PATH.ACTIVITY)}
            onClick={() => handleMenubarItemClick(PATH.ACTIVITY)}
          >
            활동
          </Menubar.Item>
          <Menubar.Item
            selected={pathName.startsWith(PATH.COMMUNITY)}
            onClick={() => handleMenubarItemClick(PATH.COMMUNITY)}
          >
            커뮤니티
          </Menubar.Item>
          <Menubar.Item
            selected={pathName.startsWith(PATH.LIBRARY)}
            onClick={() => handleMenubarItemClick(PATH.LIBRARY)}
          >
            도서관
          </Menubar.Item>
          <Menubar.Item
            selected={pathName.startsWith(PATH.SUPPORT)}
            onClick={() => handleMenubarItemClick(PATH.SUPPORT)}
          >
            회비
          </Menubar.Item>
          {data.roleLevel! >= ROLE_LEVEL.ADMIN && (
            <>
              <Menubar.Item
                selected={pathName.startsWith(PATH.MANAGE)}
                onClick={() => handleMenubarItemClick(PATH.MANAGE)}
              >
                관리
              </Menubar.Item>
              <Menubar.Item
                selected={pathName.startsWith(PATH.APPLICATION)}
                onClick={() => handleMenubarItemClick(PATH.APPLICATION)}
              >
                지원
              </Menubar.Item>
            </>
          )}
        </Menubar>
      </div>
    </>
  );
};

export default Sidebar;
