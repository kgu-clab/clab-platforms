import { createURL } from '@clab-platforms/utils';

import { API_BASE_URL } from '@constants/api';

interface FileProps extends React.PropsWithChildren {
  href: string;
}

const File = ({ children, href }: FileProps) => {
  if (!href.startsWith(API_BASE_URL)) {
    href = createURL(API_BASE_URL, href);
  }

  return (
    <a
      href={href}
      target="_blank"
      className="underline-offset-4 hover:underline"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export default File;
