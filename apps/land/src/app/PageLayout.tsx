import { cn } from '@clab-platforms/utils';

import { Footer, Nav } from '@/components';

interface PageProps {
  nav?: boolean;
  footer?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Page({
  nav = false,
  footer = false,
  className,
  children,
}: PageProps) {
  return (
    <>
      {nav && <Nav />}
      <div className={cn('m-auto pt-8', className)}>{children}</div>
      {footer && <Footer />}
    </>
  );
}
