export type ScheduleType = 'ALL' | 'STUDY' | 'PROJECT';
export type SchedulePriority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface ScheduleItem {
  id: number;
  title: string;
  detail: string;
  activityName: string | null;
  startDateTime: string;
  endDateTime: string;
  priority: SchedulePriority;
}

export interface ScheduleRegisterItem {
  scheduleType: ScheduleType;
  title: string;
  detail: string;
  startDateTime: string;
  endDateTime: string;
  priority: SchedulePriority;
  activityGroupId?: number;
}

export interface ScheduleCollect {
  totalScheduleCount: number;
  totalEventCount: number;
}
