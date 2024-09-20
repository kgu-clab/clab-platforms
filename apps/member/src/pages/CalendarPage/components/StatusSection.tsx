import {
  AlarmClockColor,
  CalendarColor,
  LeaveColor,
  OvertimeColor,
} from '@clab-platforms/icon';

import Section from '@components/common/Section/Section';
import StatusCard from '@components/common/StatusCard/StatusCard';

import { useSchedule } from '@hooks/queries';
import { calculateDDay, findClosestEvent, transformEvents } from '@utils/date';

import { useScheduleCollect } from '../hooks/useScheduleCollect';

export function StatusSection() {
  const { data: monthData } = useSchedule();
  const { data: yearData } = useScheduleCollect();

  const closestEvent = findClosestEvent(transformEvents(monthData.items));
  const closestDDay = closestEvent?.startDateTime
    ? `D-${calculateDDay(closestEvent.startDateTime)}`
    : '이번 달에 남은 일정이 없어요';

  return (
    <Section>
      <Section.Header
        title="모아보기"
        description="일정을 한 눈에 확인하세요"
      />
      <Section.Body className="grid grid-cols-2 gap-4 break-keep md:grid-cols-4">
        <StatusCard
          icon={<CalendarColor width={32} height={32} />}
          label={`${yearData.totalScheduleCount}회`}
          description="이번 연도 동아리의 모든 일정 횟수에요."
        />
        <StatusCard
          icon={<LeaveColor width={32} height={32} />}
          label={`${yearData.totalEventCount}회`}
          description="이번 연도 총회, MT 등 중요도가 높은 행사 횟수에요."
        />
        <StatusCard
          icon={<OvertimeColor width={32} height={32} />}
          label={`${monthData.totalItems}회`}
          description="이번 달 동아리 일정 횟수에요."
        />
        <StatusCard
          icon={<AlarmClockColor width={32} height={32} />}
          label={closestDDay}
          description="가장 가까운 일정까지 남은 일수에요."
        />
      </Section.Body>
    </Section>
  );
}
