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

enum MemberStatus {
  ACCEPTED = 'ACCEPTED',
  REJJECTED = 'REJECTED',
  WAITING = 'WAITING',
}
export interface ActivityGroupMemberType {
  memberId: string;
  memberName: string;
  role: string;
  status?: MemberStatus;
}
enum ActivityCategory {
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
