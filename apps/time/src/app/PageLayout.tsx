import React from 'react';

import { cn } from '@clab/utils';

import { Footer, Nav } from '@/widgets/menu';

interface PageProps {
  nav?: boolean;
  footer?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Page = ({
  nav = false,
  footer = false,
  className,
  children,
}: PageProps) => {
  return (
    <>
      {nav && <Nav />}
      <main className={cn('m-auto mt-14 max-w-xl p-4', className)}>
        {children}
      </main>
      {footer && <Footer />}
    </>
  );
};

export default Page;
