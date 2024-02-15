import { createPath } from '@utils/api';

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
  ACTIVITY_DETAIL: `/activity/:id`,
  ACTIVITY_APPLY: '/activity/apply',
  ACTIVITY_NOTICE: '/activity/:id/notice',
  ACTIVITY_STUDENT: '/activity/:id/student',
  ACTIVITY_ASSIGNMENT: '/activity/:id/:assignmentId',
  NEWS: '/news',
  BLOG: '/blog',
  LIBRARY: '/library',
  LIBRARY_DETAIL: '/library/:id',
  SUPPORT: '/support',
  SITEMAP: '/sitemap',
  LOGIN: '/login',
  AUTH: '/auth',
};

export const PATH_FINDER = {
  NEWS_POST: (id: string) => createPath(PATH.NEWS, id),
  BLOG_POST: (id: string) => createPath(PATH.BLOG, id),
  COMMUNITY_POST: (sort: string, id: string) =>
    createPath(PATH.COMMUNITY, sort, id),
  LIBRARY_DETAIL: (id: string | number) => createPath(PATH.LIBRARY, id),
  ACTIVITY_DETAIL: (id: string) => createPath(PATH.ACTIVITY, id),
  ACTIVITY_STUDENT: (id: string) => createPath(PATH.ACTIVITY, id, 'student'),
  ACTIVITY_NOTICE: (id: string) => createPath(PATH.ACTIVITY, id, 'notice'),
  ACTIVITY_ASSIGNMENT: (id: string, assignmentId: string) =>
    createPath(PATH.ACTIVITY, id, assignmentId),
  BOOK_DETAIL: (id: string) => createPath(PATH.LIBRARY, id),
};
