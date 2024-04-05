import React from 'react';
import Nav from '../Nav';
import Footer from '../Footer';
import { cn } from '@utils/component';

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
      <main className={cn('max-w-xl m-auto mt-14 p-4', className)}>
        {children}
      </main>
      {footer && <Footer />}
    </>
  );
};

export default Page;
