import { TABLE_NAMES } from '@/widgets/sugang/model';
import { Mode } from '@/widgets/sugang/types';

interface SugangTableViewProps {
  mode: Mode;
}

export default function SugangTableTitle({ mode }: SugangTableViewProps) {
  const titles = TABLE_NAMES[mode];
  return (
    <div className="flex h-fit justify-between overflow-x-scroll border-b-2 border-black/40 bg-white p-2">
      <p className="bg-lime-200">{titles[0]}</p>
      <p>
        {titles[1]} {titles[2] ?? ''}
      </p>
    </div>
  );
}
