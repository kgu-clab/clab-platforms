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

export interface ActivityGroupMemberType {
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
  groupMembers?: Array<ActivityGroupMemberType>;
  curriculum?: string;
  createdAt: string;
}
export interface ActivityApplierType {
  id: string;
  name: string;
  department: string;
  grade: number;
}

export interface ActivityRequestType {
  activityGroupId?: number;
  applierName: string;
  applierId: string;
  applierDepartment: string;
  applierYear: string;
  applyReason: string;
  createdAt?: string;
}

export interface assignmentFileType {
  id: number;
  fileUrl: string;
  submitDate: string;
}

export enum BoardType {
  SUBMIT = 'SUBMIT',
  NOTICE = 'NOTICE',
  WEEKLY_ACTIVITY = 'WEEKLY_ACTIVITY',
  FEEDBACK = 'FEEDBACK',
  ASSIGNMENT = 'ASSIGNMENT',
}

export interface ActivityBoardType {
  id: number;
  category: BoardType;
  title: string;
  content: string;
  assignmentFiles?: Array<assignmentFileType>;
  dueDateTime?: string;
  createdAt?: string;
}
