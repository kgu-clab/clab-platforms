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

export interface ActivityGroupMemberItem {
  memberId: string;
  memberName: string;
  role: string;
}
export enum ActivityCategory {
  STUDY = 'STUDY',
  PROJECT = 'PROJECT',
}
export interface ActivityGroupItem {
  id: number;
  category: ActivityCategory;
  name: string;
  content: string;
  subject: string;
  status?: string;
  imageUrl?: string;
  groupMembers?: Array<ActivityGroupMemberItem>;
  curriculum?: string;
  createdAt: string;
}
