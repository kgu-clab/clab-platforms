export const PATH = {
  ROOT: '',
  MAIN: '/',
  MY: '/my',
  CALENDER: '/calendar',
  ACTIVITY: '/activity',
  COMMUNITY: '/community',
  COMMUNITY_DETAIL: '/community/:sort',
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
