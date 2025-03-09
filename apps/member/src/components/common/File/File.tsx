import { createURL } from '@clab-platforms/utils';

import { SERVER_BASE_URL } from '@constants/api';
import { useToast } from '@hooks/common/useToast';

interface FileProps extends React.PropsWithChildren {
  href: string;
  name: string;
}

const File = ({ href, name }: FileProps) => {
  const { addToast } = useToast();

  if (!href.startsWith(SERVER_BASE_URL)) {
    href = createURL(SERVER_BASE_URL, href);
  }

  const handleClickImgLink = () => {
    fetch(href)
      .then((res) => res.blob())
      .then((blob) => {
        const href = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');

        a.href = href;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(href);
        a.remove();
      })
      .catch(() => {
        addToast({ state: 'error', message: '파일 다운로드에 실패했습니다' });
      });
  };

  return (
    <a
      href={href}
      target="_blank"
      className="text-gray-700 underline-offset-4 hover:underline"
      rel="noreferrer"
      onClick={handleClickImgLink}
    >
      {name}
    </a>
  );
};

export default File;
