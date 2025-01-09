'use client';

import { cn } from '@clab-platforms/utils';

interface Props {
  body: React.ReactNode;
  isOpen: boolean;
}

export default function Modal({ body, isOpen = false }: Props) {
  return (
    <>
      <div
        className={cn(
          'fixed inset-y-0 h-screen w-screen bg-black bg-opacity-70',
          isOpen && 'z-40',
        )}
      >
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-clab-light-gray flex w-96 flex-col space-y-8 rounded-lg p-12 text-center text-white">
            {body}
          </div>
        </div>
      </div>
    </>
  );
}
