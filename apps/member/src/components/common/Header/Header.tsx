import { Link } from 'react-router-dom';

interface HeaderProps {
  name: string;
  button?: string;
  to?: string;
}

const CommunityHeader = ({ name, button, to }: HeaderProps) => {
  return (
    <div className="flex justify-between rounded-lg border bg-white p-4">
      <div className="text-xl font-bold py-1">{name}</div>
      {button && typeof to === 'string' && (
        <Link
          to={to}
          className="flex border items-center text-sm rounded px-2 bg-gray-100 transition hover:bg-gray-200"
        >
          {button}
        </Link>
      )}
    </div>
  );
};
export default CommunityHeader;
