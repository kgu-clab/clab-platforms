'use client';

import { Dispatch, useState } from 'react';

import { KguLogo } from '@clab-platforms/icon';
import SvgMenu from '@clab-platforms/icon/src/outline/react/Menu';
import { cn } from '@clab-platforms/utils';

import { SUGANG_PAGES } from '@/widgets/sugang/model';
import { SugangTableView } from '@/widgets/sugang/ui';
import { SetStateAction } from 'jotai';

export default function SugangLayout() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="flex size-full">
      <SideBar opened={opened} />
      <div className="flex size-full flex-col">
        <Header setOpened={setOpened} />
        <div className="mb-2 flex size-full flex-col gap-y-2 p-2 px-4">
          <NavigatorBtn />
          <SugangTableView tableName="WISH_LIST" />
          {/*현재는 tableName이 고정되어 있지만, 나중에는 NavigatorBtn을 통해 누른 탭에 따라 Name을 변하게 할 예정입니다.*/}
          <SugangTableView tableName="REGISTRATION_LIST" />
        </div>
      </div>
    </div>
  );
}

function SideBar({ opened }: { opened: boolean }) {
  return (
    <div
      className={cn(
        'h-full w-44 flex-col bg-yellow-500',
        opened ? 'flex' : 'hidden',
      )}
    >
      <div className="flex w-full items-center p-[18px] text-white">
        수강신청시스템
      </div>
      <div className="size-full bg-slate-700"></div>
    </div>
  );
}

function Header({
  setOpened,
}: {
  setOpened: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex w-full items-center border-b-2 border-black/20 p-4">
      <div className="flex items-center gap-x-10">
        <button onClick={() => setOpened((prev) => !prev)}>
          <SvgMenu fontSize={20} />{' '}
        </button>
        <KguLogo className="h-fit w-24" />
      </div>
    </div>
  );
}

function NavigatorBtn() {
  const [selected, setSelected] = useState(0);
  const sugangPages = SUGANG_PAGES;
  return (
    <div className="flex">
      <div className="flex size-fit text-sm">
        {sugangPages.map((page, index) => (
          <button
            onClick={() => setSelected(index)}
            key={index}
            disabled={index !== 0}
            className={cn(
              'w-24 border-l-2 border-t-2 border-black/20 p-2 text-center',
              selected === index
                ? 'bg-white'
                : 'border-b-2 bg-gray-200 text-gray-400',
              index === sugangPages.length - 1 ? 'border-r-2' : '',
            )}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="w-full border-b-2 border-black/20" />
    </div>
  );
}
