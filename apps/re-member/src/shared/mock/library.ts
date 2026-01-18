import type { BookData, BookDetailData } from "@/types/library";

export const MOCK_BOOKS: BookData[] = [
  {
    id: 7,
    borrowerId: null,
    borrowerName: null,
    category: "교양",
    title: "서양음악의 이해 CLASSICS A toZ",
    author: "민은기,신혜승",
    publisher: "음악세계",
    imageUrl:
      "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966851287.jpg",
    dueDate: null,
    createdAt: "2024-05-13T10:41:09.176582",
    updatedAt: "2024-05-13T10:41:09.176582",
  },
  {
    id: 9,
    borrowerId: null,
    borrowerName: null,
    category: "프로그래밍",
    title: "1~100을 이용한 알고리즘의 이해(2)",
    author: "김득수",
    publisher: "21세기사",
    imageUrl:
      "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788984683822.jpg",
    dueDate: null,
    createdAt: "2024-05-13T10:41:09.176582",
    updatedAt: "2024-05-13T10:41:09.176582",
  },
  {
    id: 10,
    borrowerId: 1,
    borrowerName: "홍길동",
    category: "보안",
    title: "보안 향상을 위한 무선 모의 침투 테스트",
    author: "에런 존스",
    publisher: "패킷",
    imageUrl:
      "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788960778566.jpg",
    dueDate: "2024-06-01",
    createdAt: "2024-05-13T10:41:09.176582",
    updatedAt: "2024-05-13T10:41:09.176582",
  },
  {
    id: 46,
    borrowerId: null,
    borrowerName: null,
    category: "자격증",
    title: "CISSP 문제 VER010",
    author: "nan",
    publisher: "nan",
    imageUrl: "없음",
    dueDate: null,
    createdAt: "2024-05-13T10:41:09.176582",
    updatedAt: "2024-08-19T01:39:41.564452",
  },
];

export const MOCK_BOOK: BookDetailData = {
  id: 7,
  borrowerId: null,
  borrowerName: null,
  category: "교양",
  title: "서양음악의 이해 CLASSICS A to Z",
  author: "민은기, 신혜승",
  publisher: "음악세계",
  imageUrl:
    "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966851287.jpg",
  dueDate: null,
  createdAt: "2024-05-13T10:41:09.176582",
  updatedAt: "2024-05-13T10:41:09.176582",
  reviewLinks: [],
};
