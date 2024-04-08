/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  CommunityCategoryKorType,
  CommunityCategoryType,
} from '@type/community';

/**
 * 주어진 커뮤니티 카테고리에 해당하는 한국어 제목을 반환합니다.
 *
 * @param {CommunityCategoryType} category - 커뮤니티 카테고리 (영문)
 * @returns {CommunityCategoryKorType} 커뮤니티 카테고리에 해당하는 한국어 제목
 * @throws {Error} 유효하지 않은 카테고리일 경우 에러 발생
 */
export function categoryToTitle(
  category: CommunityCategoryType,
): CommunityCategoryKorType {
  switch (category) {
    case 'notice':
      return '공지사항';
    case 'free':
      return '자유';
    case 'qna':
      return 'QnA';
    case 'graduated':
      return '졸업생';
    case 'news':
      return 'IT 뉴스';
    case 'hire':
      return '채용 정보';
    default:
      throw new Error('Invalid title');
  }
}

/**
 * 주어진 한국어 제목에 해당하는 커뮤니티 카테고리를 반환합니다.
 *
 * @param {CommunityCategoryKorType} title - 커뮤니티 카테고리 한국어 제목
 * @returns {CommunityCategoryType} 한국어 제목에 해당하는 커뮤니티 카테고리 (영문)
 * @throws {Error} 유효하지 않은 제목일 경우 에러 발생
 */
export function titleToCategory(
  title: CommunityCategoryKorType,
): CommunityCategoryType {
  switch (title) {
    case '공지사항':
      return 'notice';
    case '자유':
      return 'free';
    case 'QnA':
      return 'qna';
    case '졸업생':
      return 'graduated';
    case 'IT 뉴스':
      return 'news';
    case '채용 정보':
      return 'hire';
    default:
      throw new Error('Invalid title');
  }
}

/**
 * 주어진 문자열이 유효한 커뮤니티 카테고리 타입인지 확인합니다.
 *
 * @param {string} type - 검사할 문자열
 * @returns {boolean} 문자열이 유효한 커뮤니티 카테고리 타입이면 true, 그렇지 않으면 false
 */
export function isCommunityCategoryType(
  type?: string,
): type is CommunityCategoryType {
  if (!type) return false;
  return ['notice', 'free', 'qna', 'graduated', 'news', 'hire'].includes(type);
}
