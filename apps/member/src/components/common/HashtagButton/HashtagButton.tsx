import { useEffect, useState } from 'react';

import { Button } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import { useHashtag } from '@hooks/queries/hashtag';

import type { Hashtag } from '@type/hashtag';

interface HashtagButtonProps {
  clicked: Array<string>;
  onClick: (hashtag: string) => void;
  className?: string;
}

const HashtagButton = ({ clicked, onClick, className }: HashtagButtonProps) => {
  const { data } = useHashtag();
  const [hashtagCategories, setHashtagCategories] = useState<
    { title: string; items: Array<Hashtag> }[]
  >([]);

  useEffect(() => {
    if (data) {
      const list = [
        {
          title: '언어',
          items: data.filter((item) => item.hashtagCategory === 'LANGUAGE'),
        },
        {
          title: '분야',
          items: data.filter((item) => item.hashtagCategory === 'FIELD'),
        },
        {
          title: '기술',
          items: data.filter((item) => item.hashtagCategory === 'SKILL'),
        },
        {
          title: '기타',
          items: data.filter((item) => item.hashtagCategory === 'ETC'),
        },
      ];

      setHashtagCategories(list);
    }
  }, [data]);

  return (
    <div className="scrollbar-hide flex flex-col space-y-2 overflow-x-scroll whitespace-nowrap p-1">
      {hashtagCategories.map(({ title, items }) => (
        <div className="flex items-center" key={title}>
          <p className="text-sm">{title}</p>
          <div className="ml-4 flex space-x-2">
            {items.map(({ id, name, boardUsageCount }) => {
              const isClicked = clicked.includes(name);
              return (
                <Button
                  key={id}
                  className={cn(
                    'rounded-full  border-gray-300 px-4',
                    isClicked && 'bg-clab-main border-none text-white',
                    className,
                  )}
                  onClick={() => onClick(name)}
                >
                  {name}
                  <span className="text-gray-400"> {boardUsageCount}</span>
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
export default HashtagButton;
