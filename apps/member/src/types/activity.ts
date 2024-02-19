type MemberStatusType = 'ACCEPTED' | 'REJECTED' | 'WAITING';
type GroupCategoryType = 'STUDY' | 'PROJECT';
export type ActivityGroupStatusType = 'WAITING' | 'PROGRESSING' | 'END';

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
  status?: MemberStatusType;
}

export interface ActivityGroupItem {
  id: number;
  name: string;
  content: string;
  category: GroupCategoryType;
  subject: string;
  imageUrl: string;
  leaderId: string;
  leaderName: string;
  participantCount: number;
  weeklyActivityCount: number;
  createdAt: string;
}
export interface ActivityApplierType {
  id: string;
  name: string;
  department: string;
  grade: number;
}

export interface ActivityRequestType {
  applierName: string;
  applierId: string;
  applierDepartment: string;
  applierYear: string;
  applyReason: string;
  createdAt?: string;
}

export interface assignmentFileType {
  fileUrl: string;
  originalFileName: string;
  storagePeriod: number;
  createdAt: string;
}

export interface ActivityBoardType {
  id?: number;
  category: string;
  title?: string;
  content?: string;
  files?: Array<assignmentFileType>;
  dueDateTime?: string;
  createdAt?: string;
}

export interface SubmitBoardType {
  category: string;
  title?: string;
  content?: string;
  fileUrls?: Array<string>;
  dueDateTime?: string;
}
