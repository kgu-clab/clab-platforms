import classNames from 'classnames';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { FaLink } from 'react-icons/fa6';

interface ShareProps {
  className?: string;
}

const Share = ({ className }: ShareProps) => {
  return (
    <div className={classNames('flex gap-4 text-clab-main-light', className)}>
      <FaFacebook className="h-5 w-5 cursor-pointer hover:text-clab-main" />
      <FaXTwitter className="h-5 w-5 cursor-pointer hover:text-clab-main" />
      <MdEmail className="h-5 w-5 cursor-pointer hover:text-clab-main" />
      <FaLink className="h-5 w-5 cursor-pointer hover:text-clab-main" />
    </div>
  );
};

export default Share;
