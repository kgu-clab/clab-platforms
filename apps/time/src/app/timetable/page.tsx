import PageLayout from '@/app/PageLayout';
import { TimeTableLayout } from '@/widgets/time-table';

export default function TimeTablePage() {
  return (
    <PageLayout nav footer className="w-full space-y-4">
      <TimeTableLayout />
    </PageLayout>
  );
}
