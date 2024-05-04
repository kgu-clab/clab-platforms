/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  CommunityCategoryKorType,
  CommunityCategoryType,
} from '@type/community';

const COMMUNITY_CATEGORY: CommunityCategoryType[] = [
  'notice',
  'free',
  'qna',
  'graduated',
  'news',
  'hire',
  'organization',
] as const;
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
  const categoryMap: Record<CommunityCategoryType, CommunityCategoryKorType> = {
    notice: '공지사항',
    free: '자유',
    qna: 'QnA',
    graduated: '졸업생',
    news: 'IT 뉴스',
    hire: '채용 정보',
    organization: '소식',
  };

  if (category in categoryMap) {
    return categoryMap[category];
  }

  throw new Error(`Invalid category: ${category}`);
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
  const categoryKorMap: Record<
    CommunityCategoryKorType,
    CommunityCategoryType
  > = {
    공지사항: 'notice',
    자유: 'free',
    QnA: 'qna',
    졸업생: 'graduated',
    'IT 뉴스': 'news',
    '채용 정보': 'hire',
    소식: 'organization',
  };

  if (title in categoryKorMap) {
    return categoryKorMap[title];
  }

  throw new Error(`Invalid title: ${title}`);
}
/**
 * 주어진 문자열이 유효한 커뮤니티 카테고리 타입인지 확인합니다.
 *
 * @param {string} value - 검사할 문자열
 * @returns {boolean} 문자열이 유효한 커뮤니티 카테고리 타입이면 true, 그렇지 않으면 false
 */
export function isCommunityCategoryType(
  value?: string,
): value is CommunityCategoryType {
  return !!value && COMMUNITY_CATEGORY.includes(value as CommunityCategoryType);
}
