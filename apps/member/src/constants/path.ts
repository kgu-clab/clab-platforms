import { createPath } from '@utils/api';
import type { IDType } from '@type/api';
import type { CommunityCategoryType } from '@type/community';

export const NOT_FOUND_IMG = '/not_found.webp';

export const PATH = {
  ROOT: '',
  MAIN: '/',
  MY: '/my',
  CALENDER: '/calendar',
  COMMUNITY: '/community',
  COMMUNITY_DETAIL: '/community/:type',
  COMMUNITY_POST: '/community/:type/:id',
  COMMUNITY_NOTICE: '/community/notice',
  COMMUNITY_FREE: '/community/free',
  COMMUNITY_QNA: '/community/qna',
  COMMUNITY_GRADUATED: '/community/graduated',
  COMMUNITY_NEWS: '/community/news',
  COMMUNITY_HIRE: '/community/hire',
  COMMUNITY_WRITE: '/community/write',
  ACTIVITY: '/activity',
  ACTIVITY_APPLY: '/activity/apply',
  ACTIVITY_DETAIL: `/activity/:id`,
  ACTIVITY_CONFIG: '/activity/:id/config',
  ACTIVITY_ASSIGNMENT: '/activity/:id/:assignmentId',
  NEWS: '/news',
  BLOG: '/blog',
  LIBRARY: '/library',
  LIBRARY_DETAIL: '/library/:id',
  SUPPORT: '/support',
  SITEMAP: '/sitemap',
  LOGIN: '/login',
  AUTH: '/auth',
} as const;

export const PATH_FINDER = {
  NEWS_POST: (id: IDType) => createPath(PATH.NEWS, id),
  BLOG_POST: (id: IDType) => createPath(PATH.BLOG, id),
  COMMUNITY_POST: (sort: CommunityCategoryType, id: IDType) =>
    createPath(PATH.COMMUNITY, sort, id),
  LIBRARY_DETAIL: (id: IDType) => createPath(PATH.LIBRARY, id),
  ACTIVITY_DETAIL: (id: IDType) => createPath(PATH.ACTIVITY, id),
  ACTIVITY_CONFIG: (id: IDType) => createPath(PATH.ACTIVITY, id, 'config'),
  ACTIVITY_ASSIGNMENT: (groupId: IDType, id: IDType) =>
    createPath(PATH.ACTIVITY, groupId, id),
  BOOK_DETAIL: (id: string) => createPath(PATH.LIBRARY, id),
} as const;
