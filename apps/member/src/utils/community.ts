import type {
  CommunityCategoryKorType,
  CommunityCategoryType,
} from '@type/community';

const COMMUNITY_CATEGORY: CommunityCategoryType[] = [
  'notice',
  'free',
  'development_qna',
  'information_reviews',
  'news',
  'hire',
  'organization',
] as const;

const CATEGORY_MAP: Record<
  CommunityCategoryType,
  { title: CommunityCategoryKorType; emoji: string }
> = {
  notice: { title: '공지사항', emoji: '📢' },
  free: { title: '자유', emoji: '📝' },
  development_qna: { title: '개발 질문', emoji: '🤔' },
  information_reviews: { title: '정보 및 후기', emoji: '🔎' },
  news: { title: 'IT 뉴스', emoji: '📰' },
  hire: { title: '채용 정보', emoji: '👔' },
  organization: { title: '소식', emoji: '🎉' },
};
/**
 * 주어진 커뮤니티 카테고리에 해당하는 한국어 제목을 반환합니다.
 *
 * @param {CommunityCategoryType} category - 커뮤니티 카테고리 (영문)
 * @returns {CommunityCategoryKorType} 커뮤니티 카테고리에 해당하는 한국어 제목
 * @throws {Error} 유효하지 않은 카테고리일 경우 에러 발생
 */
export function getCategoryTitle(
  category: CommunityCategoryType,
): CommunityCategoryKorType {
  if (category in CATEGORY_MAP) {
    return CATEGORY_MAP[category].title;
  }
  throw new Error(`Invalid category title: ${category}`);
}
/**
 * 주어진 커뮤니티 카테고리에 해당하는 이모지를 반환합니다.
 *
 * @param {CommunityCategoryType} category - 커뮤니티 카테고리 (영문)
 * @returns {string} 커뮤니티 카테고리에 해당하는 이모지
 * @throws {Error} 유효하지 않은 카테고리일 경우 에러 발생
 */
export function getCategoryEmoji(category: CommunityCategoryType): string {
  if (category in CATEGORY_MAP) {
    return CATEGORY_MAP[category].emoji;
  }
  throw new Error(`Invalid category emoji: ${category}`);
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
