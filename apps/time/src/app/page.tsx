import {
  CalculatorColor,
  ComboChartColor,
  DownloadColor,
  GraduationCapColor,
  LandscapeColor,
  MultipleDevicesColor,
  ReadingColor,
  ViewDetailsColor,
} from '@clab-platforms/icon';

import PageLayout from '@/app/PageLayout';
import { PATH } from '@/shared/constants';
import {
  HomeCard,
  HomeCardDescription,
  HomeCardHeader,
  HomeCardIcon,
} from '@/widgets/home';

const buttons = [
  {
    row: false,
    disabled: false,
    to: PATH.TIMETABLE,
    title: '시간표',
    description: '강의 시간표를 조합하고 관리할 수 있어요',
    icon: <ComboChartColor width={48} height={48} />,
  },
  {
    row: false,
    disabled: false,
    to: PATH.GRADE,
    title: '학점',
    description: '학점을 계산하고 관리할 수 있어요',
    icon: <CalculatorColor width={48} height={48} />,
  },
  {
    row: false,
    disabled: false,
    to: PATH.LIBRARY,
    title: '도서관',
    description: '도서관 좌석 현황을 확인할 수 있어요',
    icon: <ReadingColor width={48} height={48} />,
  },
  {
    row: false,
    disabled: false,
    to: PATH.LOST,
    title: '분실물',
    description: '분실물을 등록하고 찾을 수 있어요',
    icon: <MultipleDevicesColor width={48} height={48} />,
  },
  {
    row: true,
    disabled: true,
    to: PATH.GRADUATION,
    title: '졸업요건진단',
    description:
      'Kutis에서 2017년까지 제공되던 졸업요건 진단 기능을 경기타임팀에서 개발 중이에요, 많은 기대 부탁드려요',
    icon: <GraduationCapColor width={48} height={48} />,
  },
  {
    row: false,
    disabled: true,
    to: PATH.FESTIVAL,
    title: '축제',
    description: '학교 축제 정보를 제공해 드려요, 축제 시즌 때 만나요',
    icon: <LandscapeColor width={48} height={48} />,
  },
  {
    row: false,
    disabled: false,
    to: PATH.FOOD,
    title: '학식',
    description: '감성코어, 기숙사 학식 정보를 제공해 드려요',
    icon: <ViewDetailsColor width={48} height={48} />,
  },
] as const;

export default function Home() {
  return (
    <PageLayout nav footer className="max-w-xl space-y-4">
      <div className="text-center text-xl font-semibold">
        <h2 className="inline-block bg-gradient-to-r from-sky-600 via-indigo-500 to-purple-500 bg-clip-text font-bold text-transparent">
          OPEN-BETA
        </h2>
        <p className="flex justify-center gap-2 text-xs text-gray-500">
          현재 불안정하거나 구현되지 않는 기능이 있을 수 있습니다.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {buttons.map(({ row, disabled, to, title, description, icon }) => (
          <HomeCard
            key={title}
            to={to}
            className={row ? 'col-span-2' : 'col-span-1'}
            disabled={disabled}
          >
            <HomeCardHeader>{title}</HomeCardHeader>
            <HomeCardDescription>{description}</HomeCardDescription>
            <HomeCardIcon>{icon}</HomeCardIcon>
          </HomeCard>
        ))}
      </div>
      <HomeCard to={PATH.GUIDE}>
        <div className="flex items-center gap-4">
          <DownloadColor width={48} height={48} />
          <div>
            <p className="font-semibold">애플리케이션 설치 가이드</p>
            <p className="text-sm text-gray-500">
              경기타임를 모바일에 다운로드하고 싶으신가요?
            </p>
          </div>
        </div>
      </HomeCard>
    </PageLayout>
  );
}
