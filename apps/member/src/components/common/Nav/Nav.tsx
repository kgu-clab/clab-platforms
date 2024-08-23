import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Menubar } from '@clab-platforms/design-system';
import { GridOutline, SearchOutline, UserOutline } from '@clab-platforms/icon';
import { cn } from '@clab-platforms/utils';

import { IS_DEVELOPMENT } from '@constants/environment';
import { PATH } from '@constants/path';
import { ROLE_LEVEL } from '@constants/state';
import useModal from '@hooks/common/useModal';
import { useMyProfile } from '@hooks/queries';

import Sidebar from '../Sidebar/Sidebar';

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const { data } = useMyProfile();

  const pathName = location.pathname;

  const handleMenubarItemClick = (path: string) => navigate(path);

  const handleNotReadyClick = () => {
    return openModal({
      content: '해당 기능은 준비중입니다.',
    });
  };

  return (
    <nav
      className={cn('fixed left-0 top-0 z-30 w-full border-b bg-white', {
        'border-b-orange-300': IS_DEVELOPMENT,
      })}
    >
      <div className="container flex h-14 items-center justify-between bg-white">
        <div className="flex items-center gap-10 lg:gap-20">
          <Link className="flex items-center gap-2 text-xl" to={PATH.MAIN}>
            <img src="/favicon.ico" alt="c-lab" className="size-7" />
            <h1 className="font-bold">멤버스 </h1>
            {IS_DEVELOPMENT && (
              <span className="pb-2.5 text-xs font-semibold text-orange-500">
                DEV
              </span>
            )}
          </Link>
          <Menubar gap="xl" className="hidden text-sm md:flex">
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
        <div className="flex gap-5">
          {IS_DEVELOPMENT && (
            <>
              <button onClick={handleNotReadyClick}>
                <SearchOutline width={20} height={20} />
              </button>
              <button onClick={handleNotReadyClick}>
                <GridOutline width={20} height={20} />
              </button>
            </>
          )}
          <Link to={PATH.MY}>
            <UserOutline width={20} height={20} />
          </Link>
          <Sidebar />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
