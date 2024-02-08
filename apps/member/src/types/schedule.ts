export interface ScheduleItem {
  id: number;
  title: string;
  detail: string;
  activityName: string;
  startDate: string;
  endDate: string;
  to?: string;
}

export interface ScheduleRegisterItem {
  scheduleType?: string;
  title: string;
  detail: string;
  startDateTime: string;
  endDateTime: string;
  activityGroupId?: number;
}
