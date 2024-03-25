import { Link, useLocation } from 'react-router-dom';
import { PATH } from '@constants/path';
import { FiSearch } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { FiGrid } from 'react-icons/fi';
import useModal from '@hooks/common/useModal';
import { MODE } from '@constants/environment';

const Nav = () => {
  const location = useLocation();
  const { openModal } = useModal();

  const selected = (path: string) => {
    if (path === PATH.MAIN && location.pathname.length === 1) {
      return 'font-semibold text-black';
    } else if (path !== PATH.MAIN && location.pathname.length !== 1) {
      return location.pathname.match(path)
        ? 'font-semibold text-black'
        : 'text-gray-400 hover:text-black';
    } else {
      return 'text-gray-400 hover:text-black';
    }
  };

  const onClickNotReady = () => {
    openModal({
      content: '해당 기능은 준비중입니다.',
    });
  };

  return (
    <nav className="fixed top-0 left-0 z-30 w-full bg-white border-b">
      <div className="section flex h-[61px] items-center justify-between py-1.5">
        <div className="flex items-center gap-10 lg:gap-20">
          <Link className="flex items-center gap-2 text-xl" to={PATH.MAIN}>
            <img src="/favicon.ico" alt="c-lab" className="size-8" />
            <h1 className="font-bold">PLAY</h1>
          </Link>
          <div className="hidden gap-10 text-sm font-semibold sm:flex">
            <Link to={PATH.MAIN} className={selected(PATH.MAIN)}>
              홈
            </Link>
            <Link to={PATH.CALENDER} className={selected(PATH.CALENDER)}>
              일정
            </Link>
            {MODE !== 'production' && (
              <Link to={PATH.ACTIVITY} className={selected(PATH.ACTIVITY)}>
                활동
              </Link>
            )}
            <Link to={PATH.COMMUNITY} className={selected(PATH.COMMUNITY)}>
              커뮤니티
            </Link>
            <Link to={PATH.LIBRARY} className={selected(PATH.LIBRARY)}>
              도서관
            </Link>
            <Link to={PATH.SUPPORT} className={selected(PATH.SUPPORT)}>
              회비
            </Link>
            {MODE !== 'production' && (
              <button className="text-red-500" onClick={onClickNotReady}>
                관리
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-5">
          {MODE !== 'production' && (
            <>
              <button onClick={onClickNotReady}>
                <FiSearch size={20} />
              </button>
              <button onClick={onClickNotReady}>
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
