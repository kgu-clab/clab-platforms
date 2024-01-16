import { Link } from 'react-router-dom';

interface MoreButtonProps {
  to: string;
  children?: React.ReactNode;
}

const MoreButton = ({ to, children }: MoreButtonProps) => {
  return (
    <Link
      to={to}
      className="rounded-lg px-1.5 py-0.5 text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-800"
    >
      {children || '더보기'}
    </Link>
  );
};

export default MoreButton;
