export interface CommunityPost {
  id: string;
  category: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: number;
}

export const communityPostsList: CommunityPost[] = [
  {
    id: "1",
    category: "자유",
    title: "학교 근처 맛집 추천해주세요!",
    content:
      "다음주에 친구들이랑 밥먹으러 가는데 어디가 좋을까요? 분위기 좋은 곳으로 부탁드려요~",
    author: "김철수",
    likes: 24,
    comments: 12,
  },
  {
    id: "2",
    category: "질문",
    title: "React 상태관리 라이브러리 추천",
    content:
      "프로젝트에서 사용할 상태관리 라이브러리를 고민 중인데 Redux vs Zustand 중 어떤게 더 나을까요?",
    author: "이영희",
    likes: 18,
    comments: 8,
  },
  {
    id: "3",
    category: "정보",
    title: "2026 IT 컨퍼런스 일정 공유",
    content:
      "올해 개최되는 주요 IT 컨퍼런스 일정을 정리해봤습니다. 참고하세요!",
    author: "박지훈",
    likes: 32,
    comments: 5,
  },
  {
    id: "4",
    category: "자유",
    title: "코딩테스트 준비 스터디원 모집",
    content: "알고리즘 스터디 같이 하실 분 찾습니다. 주 2회 진행 예정이에요",
    author: "최수진",
    likes: 15,
    comments: 20,
  },
  {
    id: "5",
    category: "질문",
    title: "백엔드 개발자 로드맵 질문",
    content:
      "백엔드 개발자로 취업을 준비하고 있는데 어떤 순서로 공부하면 좋을까요?",
    author: "정민수",
    likes: 28,
    comments: 15,
  },
];
