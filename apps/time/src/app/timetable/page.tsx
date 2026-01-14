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
        className="m-0 grid min-h-[calc(100vh-201px)] w-screen grid-rows-[auto_auto] p-0 lg:grid-cols-[598px_1fr]"
      >
        <TimeTableContainer />
        <LectureSearchContainer />
      </PageLayout>
    </TimeTableProvider>
  );
}
