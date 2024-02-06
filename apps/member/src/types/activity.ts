export interface ActivityItem {
  scheduleType: string;
  title: string;
  detail: string;
  startDateTime: string;
  endDateTime: string;
  activityGroupId: number;
}

export interface ActivityPhotoItem {
  id: number;
  title: string;
  imageUrl: string;
  date: string;
  isPublic: boolean;
}
