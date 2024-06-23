import { createURL } from '@clab/utils';

import type { IDType } from '@type/api';
import type { CommunityCategoryType } from '@type/community';

export const NOT_FOUND_IMG = '/not_found.webp';
/**
 * 페이지 라우팅 경로입니다.
 */
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
  BLOG: '/blog',
  BLOG_DETAIL: '/blog/:id',
  LIBRARY: '/library',
  LIBRARY_DETAIL: '/library/:id',
  SUPPORT: '/support',
  SITEMAP: '/sitemap',
  MANAGE: '/manage',
  LOGIN: '/login',
  AUTH: '/auth',
} as const;
/**
 * 페이지의 URL을 생성하는 함수입니다.
 */
export const PATH_FINDER = {
  BLOG_POST: (id: IDType) => createURL(PATH.BLOG, id),
  COMMUNITY_DETAIL: (type: CommunityCategoryType) =>
    createURL(PATH.COMMUNITY, type),
  COMMUNITY_POST: (sort: CommunityCategoryType, id: IDType) =>
    createURL(PATH.COMMUNITY, sort, id),
  LIBRARY_DETAIL: (id: IDType) => createURL(PATH.LIBRARY, id),
  ACTIVITY_DETAIL: (id: IDType) => createURL(PATH.ACTIVITY, id),
  ACTIVITY_CONFIG: (id: IDType) => createURL(PATH.ACTIVITY, id, 'config'),
  ACTIVITY_ASSIGNMENT: (groupId: IDType, id: IDType) =>
    createURL(PATH.ACTIVITY, groupId, id),
  BOOK_DETAIL: (id: number) => createURL(PATH.LIBRARY, id),
} as const;
/**
 * 페이지의 이름입니다.
 */
export const PATH_NAME = {
  LIBRARY: '도서관',
  COMMUNITY: '커뮤니티',
} as const;
/**
 * 온라인 서점의 검색 URL입니다.
 */
export const BOOK_STORE_URL = {
  kyobobook: 'https://search.kyobobook.co.kr/search?keyword=',
  yes24: 'https://www.yes24.com/Product/Search?domain=ALL&query=',
  aladin:
    'https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=All&SearchWord=',
} as const;
