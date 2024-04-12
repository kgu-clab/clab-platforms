import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLink } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

import classNames from 'classnames';

interface ShareProps extends React.HTMLAttributes<HTMLDivElement> {}

const Share = ({ className }: ShareProps) => {
  const currentUrl = window.location.href;
  /**
   * 클립보드에 현재 URL 복사하는 이벤트
   */
  const handleClipboardClick = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('해당 게시글이 클립보드에 복사됐어요.');
    } catch (error) {
      alert('클립보드에 복사하는데 실패했어요.');
    }
  };

  return (
    <div className={classNames('text-clab-main-light flex gap-4', className)}>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook size={20} className="hover:text-clab-main" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaXTwitter size={20} className="hover:text-clab-main" />
      </a>
      <a
        href={`mailto:?body=${currentUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MdEmail size={20} className="hover:text-clab-main" />
      </a>
      <FaLink
        size={20}
        className="hover:text-clab-main cursor-pointer"
        onClick={handleClipboardClick}
      />
    </div>
  );
};

export default Share;
