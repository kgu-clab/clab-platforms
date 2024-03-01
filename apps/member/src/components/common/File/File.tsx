import { API_BASE_URL } from '@constants/api';
import { createPath } from '@utils/api';

interface FileProps extends React.PropsWithChildren {
  href: string;
}

const File = ({ children, href }: FileProps) => {
  if (!href.startsWith(API_BASE_URL)) {
    href = createPath(API_BASE_URL, href);
  }

  return (
    <a
      href={href}
      target="_blank"
      className="hover:underline underline-offset-4"
    >
      {children}
    </a>
  );
};

export default File;
