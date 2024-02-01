import { Link } from 'react-router-dom';
import { PATH } from '@constants/path';
import { FiSearch } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { FiGrid } from 'react-icons/fi';

const Nav = () => {
  const onClickReady = () => {
    alert('준비중');
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b bg-white">
      <div className="section flex h-[61px] items-center justify-between py-1.5">
        <div className="flex items-center gap-10 lg:gap-20">
          <Link className="flex items-center gap-2 text-xl" to={PATH.MAIN}>
            <img src="/favicon.ico" alt="c-lab" className="size-8" />
            <h1 className="font-bold">
              PLAY<span className="font-medium">GROUND</span>
            </h1>
          </Link>
          <div className="hidden gap-10 text-sm font-semibold sm:flex">
            <Link to={PATH.MAIN}>홈</Link>
            <Link to={PATH.CALENDER}>일정</Link>
            <Link to={PATH.ACTIVITY}>활동</Link>
            <Link to={PATH.COMMUNITY}>커뮤니티</Link>
            <Link to={PATH.LIBRARY}>도서관</Link>
            <Link to={PATH.SUPPORT}>회비</Link>
            <button className="text-red-500" onClick={onClickReady}>
              관리
            </button>
          </div>
        </div>
        <div className="flex gap-5">
          <button onClick={onClickReady}>
            <FiSearch className="h-5 w-5" />
          </button>
          <button onClick={onClickReady}>
            <FiGrid className="h-5 w-5" />
          </button>
          <Link to={PATH.MY}>
            <FiUser className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
