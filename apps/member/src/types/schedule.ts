export interface ScheduleItem {
  id: number;
  title: string;
  detail: string;
  activityName: string | null;
  startDate: string;
  endDate: string;
}

export interface ScheduleRegisterItem {
  scheduleType?: string;
  title: string;
  detail: string;
  startDateTime: string;
  endDateTime: string;
  activityGroupId?: number;
}
