import { SELECT_ACTIVITY_GROUP_CATEGORY_TYPE } from '@constants/select';
import {
  ACTIVITY_BOARD_CATEGORY_STATE,
  ACTIVITY_MEMBER_ROLE,
  ACTIVITY_MEMBER_STATE,
  ACTIVITY_STATE,
} from '@constants/state';

import type { ResponseFile } from './api';

export type MemberStatusType =
  (typeof ACTIVITY_MEMBER_STATE)[keyof typeof ACTIVITY_MEMBER_STATE];
export type ActivityGroupBoardCategoryType =
  (typeof ACTIVITY_BOARD_CATEGORY_STATE)[keyof typeof ACTIVITY_BOARD_CATEGORY_STATE];
export type ActivityGroupCategoryType =
  (typeof SELECT_ACTIVITY_GROUP_CATEGORY_TYPE)[keyof typeof SELECT_ACTIVITY_GROUP_CATEGORY_TYPE];
export type ActivityMemberRoleType =
  (typeof ACTIVITY_MEMBER_ROLE)[keyof typeof ACTIVITY_MEMBER_ROLE];
export type ActivityGroupStatusType =
  (typeof ACTIVITY_STATE)[keyof typeof ACTIVITY_STATE];
export type LeaderType = {
  id: string;
  name: string;
};

export interface ActivityGroupDetailType {
  id: number;
  category: ActivityGroupCategoryType;
  subject: string;
  name: string;
  content: string;
  status: ActivityGroupStatusType;
  imageUrl: string;
  groupMembers: ActivityGroupMemberType[];
  curriculum: string;
  activityGroupBoards: ActivityBoardType[];
  createdAt: string;
  isOwner: boolean;
  githubUrl: string;
  techStack: string;
}

export interface ActivityPhotoItem {
  id: number;
  title: string;
  files: Array<ResponseFile>;
  date: string;
  isPublic: boolean;
}

export interface ActivityGroupMemberType {
  memberId: string;
  memberName: string;
  role: ActivityMemberRoleType;
  status: MemberStatusType;
}

export interface ActivityApplyMemberType extends ActivityGroupMemberType {
  applyReason: string;
}

export interface ActivityGroupCreateItem {
  category: ActivityGroupCategoryType;
  subject: string;
  name: string;
  content: string;
  imageUrl?: string;
  curriculum?: string;
  startDate?: string;
  endDate?: string;
  techStack?: string;
  githubUrl?: string;
}

export interface ActivityGroupItem {
  id: number;
  name: string;
  content: string;
  category: ActivityGroupCategoryType;
  subject: string;
  imageUrl: string;
  leaders: Array<LeaderType>;
  participantCount: number;
  weeklyActivityCount: number;
  createdAt: string;
}

export interface ActivityRequestType {
  applyReason: string;
  createdAt?: string;
}

/**
 * @deprecated `ResponseFile`으로 대체합니다.
 */
export interface AssignmentFileType {
  fileUrl: string;
  originalFileName: string;
  storagePeriod: number;
  createdAt: string;
}

export interface ActivityBoardType {
  id: number;
  parentId: number;
  category: ActivityGroupBoardCategoryType;
  content: string;
  files: Array<ResponseFile>;
  title?: string;
  dueDateTime?: string;
  createdAt: string;
  updatedAt?: string;
  memberName?: string;
  memberId?: string;
  feedbacks?: Array<ActivityBoardType>;
  children?: Array<ActivityBoardType>;
}

export interface SubmitBoardType {
  category?: ActivityGroupBoardCategoryType;
  title?: string;
  content?: string;
  fileUrls?: Array<string>;
  dueDateTime?: string;
}

export interface ActivityBoardWithAssignmentType extends ActivityBoardType {
  assignments?: Array<ActivityBoardType>;
}

export interface ActivityGroupBoardParserType extends ActivityGroupDetailType {
  notices: Array<ActivityBoardType>;
  activities: Array<ActivityBoardType>;
  assignments: Array<ActivityBoardType>;
}

export interface ActivityPhotosBody {
  title: string;
  fileUrlList: Array<string>;
  date: string;
}
