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
  ACTIVITY_APPLY: '/activity/apply',
  ACTIVITY_DETAIL: `/activity/:id`,
  ACTIVITY_ASSIGNMENT: '/activity/:id/assignment',
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
  LIBRARY_DETAIL: (id: string) => createPath(PATH.LIBRARY, id),
  ACTIVITY_DETAIL: (id: number) => createPath(PATH.ACTIVITY, id),
  ACTIVITY_ASSIGNMENT: (id: number) =>
    createPath(PATH.ACTIVITY, id, 'assignment'),
};
