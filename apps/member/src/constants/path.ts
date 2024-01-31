type PathFinderId = string | number;

export const createPath = (...nodes: Array<PathFinderId>): string => {
  return nodes
    .map((node) => {
      if (typeof node === 'string' || typeof node === 'number') {
        return node.toString();
      }
      throw new Error('Invalid node type');
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
