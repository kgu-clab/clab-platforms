import PageLayout from '@/app/PageLayout';
import {
  LectureSearchContainer,
  TimeTableContainer,
} from '@/widgets/time-table/ui';

export default function TimeTablePage() {
  return (
    <PageLayout nav footer className="flex w-screen p-0">
      <TimeTableContainer />
      <LectureSearchContainer />
    </PageLayout>
  );
}
