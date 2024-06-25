import { CurrentServices } from '@/src/widgets/service-status';

export default function Home() {
  return (
    <div className="flex size-full flex-col items-start justify-center gap-y-10">
      <CurrentServices />
    </div>
  );
}
