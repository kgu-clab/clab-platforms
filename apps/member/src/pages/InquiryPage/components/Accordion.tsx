import { useEffect, useState } from 'react';

import { cn } from '@clab-platforms/utils';

import DropdownButton from '@components/common/DropdownButton/DropdownButton';

interface AccordionItem {
  id: string | number;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  resetKey?: string;
}

const Accordion = ({ items, className, resetKey }: AccordionProps) => {
  const [openId, setOpenId] = useState<string | number | null>(null);

  useEffect(() => {
    setOpenId(null);
  }, [resetKey]);

  const handleToggle = (id: string | number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {items.map(({ id, question, answer }) => {
        const isOpen = openId === id;
        return (
          <div key={id} className="w-full rounded-lg border bg-white">
            {/* 아코디언 헤더 */}
            <div
              className={cn(
                'text-clab-main flex items-center justify-between rounded-t-lg bg-gray-100 p-4 ease-in-out',
                isOpen && 'rounded-b-lg',
              )}
            >
              <div className="flex items-center gap-2 font-semibold">
                <span className="text-md text-nowrap">{question}</span>
              </div>
              <DropdownButton
                key={isOpen ? 'open' : 'closed'}
                isOpen={isOpen}
                onClick={() => handleToggle(id)}
              />
            </div>

            {/* 아코디언 바디 */}
            <div
              className={cn(
                'overflow-hidden rounded-b-lg transition duration-500 ease-in-out',
                isOpen ? 'p-4 opacity-100' : 'max-h-0 opacity-0',
              )}
            >
              <div className="whitespace-pre-line leading-relaxed">
                {answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
