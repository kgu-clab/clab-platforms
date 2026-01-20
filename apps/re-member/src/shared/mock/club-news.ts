export interface ClubNews {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

export const clubNewsList: ClubNews[] = [
  {
    id: "1",
    category: "공지",
    title: "2025년 송년회",
    description: "송년회 참석 투표에\n참여해주세요!",
    image: "/images/club-news-1.jpg",
  },
  {
    id: "2",
    category: "행사",
    title: "해커톤 대회",
    description: "2025 봄 해커톤\n참가 신청하세요!",
    image: "/images/club-news-2.jpg",
  },
  {
    id: "3",
    category: "모집",
    title: "신입 부원 모집",
    description: "2025년 1학기\n신입 부원을 모집합니다",
    image: "/images/club-news-3.jpg",
  },
];
