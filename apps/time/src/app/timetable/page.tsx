import PageLayout from '@/app/PageLayout';
import {
  LectureSearchContainer,
  TimeTableContainer,
} from '@/widgets/time-table/ui';

export default function TimeTablePage() {
  return (
    <PageLayout
      nav
      footer
      className="grid w-screen grid-rows-[auto_1fr] p-0 lg:grid-cols-2"
    >
      <TimeTableContainer />
      <LectureSearchContainer />
    </PageLayout>
  );
}
