import { cn } from '@clab-platforms/utils';

import { Footer, Nav } from '@/widgets/menu/ui';

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
      <div className={cn('m-auto mt-14 p-4', className)}>{children}</div>
      {footer && <Footer />}
    </>
  );
}
