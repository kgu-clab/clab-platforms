import { Link } from 'react-router-dom';

const CommunityHeader = () => {
  return (
    <div className="flex justify-between rounded-lg border bg-white p-4">
      <div className="text-xl font-bold py-1">커뮤니티</div>
      <Link
        to="/community/write"
        className="flex border items-center text-sm rounded px-2 bg-gray-100 transition hover:bg-gray-200"
      >
        글쓰기
      </Link>
    </div>
  );
};
export default CommunityHeader;
