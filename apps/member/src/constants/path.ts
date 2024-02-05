type PathFinderId = string | number;

export const createPath = (...paths: Array<PathFinderId>): string => {
  return paths
    .map((path) => {
      if (typeof path === 'string' || typeof path === 'number') {
        return path.toString();
      }
      throw new Error('Invalid path type');
    })
    .join('/');
};

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
  NEWS_POST: (id: PathFinderId) => createPath(PATH.NEWS, id),
  BLOG_POST: (id: PathFinderId) => createPath(PATH.BLOG, id),
  COMMUNITY_POST: (sort: string, id: PathFinderId) =>
    createPath(PATH.COMMUNITY, sort, id),
  LIBRARY_DETAIL: (id: PathFinderId) => createPath(PATH.LIBRARY, id),
  ACTIVITY_DETAIL: (id: PathFinderId) => createPath(PATH.ACTIVITY, id),
  ACTIVITY_STUDENT: (id: PathFinderId) =>
    createPath(PATH.ACTIVITY, id, 'student'),
  ACTIVITY_NOTICE: (id: PathFinderId) =>
    createPath(PATH.ACTIVITY, id, 'notice'),
  ACTIVITY_ASSIGNMENT: (id: PathFinderId, assignmentId: PathFinderId) =>
    createPath(PATH.ACTIVITY, id, assignmentId),
};
