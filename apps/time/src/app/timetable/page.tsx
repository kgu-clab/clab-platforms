import PageLayout from '@/app/PageLayout';
import { TimeTableProvider } from '@/widgets/time-table/context/TimeTableContext';
import {
  LectureSearchContainer,
  TimeTableContainer,
} from '@/widgets/time-table/ui';

export default function TimeTablePage() {
  return (
    <TimeTableProvider>
      <PageLayout
        nav
        footer
        className="grid w-screen grid-rows-[auto_1fr] p-0 lg:grid-cols-[598px_1fr]"
      >
        <TimeTableContainer />
        <LectureSearchContainer />
      </PageLayout>
    </TimeTableProvider>
  );
}
