import { SUGANG_PAGE } from '@/widgets/sugang/model';
import { SugangPageKR } from '@/widgets/sugang/types';

interface SugangPageButtonsProps {
  selected: number;
  setSelected: (index: number) => void;
}

export default function SugangPageButtons({
  selected,
  setSelected,
}: SugangPageButtonsProps) {
  const sugangPages: SugangPageKR[] = Object.values(SUGANG_PAGE);
  return (
    <>
      <div className="flex border-b-2 border-black/40">
        {sugangPages.map((page, index) => (
          <button
            onClick={() => setSelected(index)}
            key={index}
            className={`w-24 p-2 text-center ${selected === index ? 'bg-white' : 'bg-gray-200 text-gray-400'}`}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
}
