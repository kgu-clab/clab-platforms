import { useCallback } from 'react';
import { FiGrid, FiSearch, FiUser } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Menubar, MenubarItem } from '@clab/design-system';

import { MODE } from '@constants/environment';
import { PATH } from '@constants/path';
import useModal from '@hooks/common/useModal';

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const isSelected = (path: string) => {
    return location.pathname.endsWith(path);
  };

  const handleMenubarItemClick = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  const handleNotReadyClick = useCallback(() => {
    return openModal({
      content: '해당 기능은 준비중입니다.',
    });
  }, [openModal]);

  return (
    <nav className="fixed left-0 top-0 z-30 w-full border-b bg-white">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-10 lg:gap-20">
          <Link className="flex items-center gap-2 text-xl" to={PATH.MAIN}>
            <img src="/favicon.ico" alt="c-lab" className="size-7" />
            <h1 className="font-bold">멤버스</h1>
          </Link>
          <Menubar gap="xl" className="text-sm">
            <MenubarItem
              selected={isSelected(PATH.MAIN)}
              onClick={() => handleMenubarItemClick(PATH.MAIN)}
            >
              홈
            </MenubarItem>
            <MenubarItem
              selected={isSelected(PATH.CALENDER)}
              onClick={() => handleMenubarItemClick(PATH.CALENDER)}
            >
              일정
            </MenubarItem>
            <MenubarItem
              selected={isSelected(PATH.ACTIVITY)}
              onClick={() => handleMenubarItemClick(PATH.ACTIVITY)}
            >
              활동
            </MenubarItem>
            <MenubarItem
              selected={isSelected(PATH.COMMUNITY)}
              onClick={() => handleMenubarItemClick(PATH.COMMUNITY)}
            >
              커뮤니티
            </MenubarItem>
            <MenubarItem
              selected={isSelected(PATH.LIBRARY)}
              onClick={() => handleMenubarItemClick(PATH.LIBRARY)}
            >
              도서관
            </MenubarItem>
            <MenubarItem
              selected={isSelected(PATH.SUPPORT)}
              onClick={() => handleMenubarItemClick(PATH.SUPPORT)}
            >
              회비
            </MenubarItem>
            {MODE !== 'production' && (
              <MenubarItem
                selected={isSelected(PATH.MANAGE)}
                onClick={() => handleMenubarItemClick(PATH.MANAGE)}
              >
                관리
              </MenubarItem>
            )}
          </Menubar>
        </div>
        <div className="flex gap-5">
          {MODE !== 'production' && (
            <>
              <button onClick={handleNotReadyClick}>
                <FiSearch size={20} />
              </button>
              <button onClick={handleNotReadyClick}>
                <FiGrid size={20} />
              </button>
            </>
          )}
          <Link to={PATH.MY}>
            <FiUser size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
