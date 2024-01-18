export const PATH = {
  ROOT: '',
  MAIN: '/',
  MY: '/my',
  CALENDER: '/calendar',
  ACTIVITY: '/activity',
  COMMUNITY: '/community',
  COMMUNITY_DETAIL: '/community/:sort',
  COMMUNITY_NOTICE: '/community/notice',
  COMMUNITY_GASSIP: '/community/gassip',
  COMMUNITY_QNA: '/community/qna',
  COMMUNITY_GRADUATED: '/community/graduated',
  COMMUNITY_NEWS: '/community/news',
  COMMUNITY_HIRE: '/community/hire',
  COMMUNITY_POST: '/communityPost/:sort/:id',
  COMMUNITY_WRITE: '/community/write',
  NEWS: '/news',
  BLOG: '/blog',
  LIBRARY: '/library',
  SUPPORT: '/support',
  SITEMAP: '/sitemap',
};

export const PATH_FINDER = {
  NEWS_POST: (id: number) => `${PATH.NEWS}/${id}`,
  BLOG_POST: (id: number) => `${PATH.BLOG}/${id}`,
};
