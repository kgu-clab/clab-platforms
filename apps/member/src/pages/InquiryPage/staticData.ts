import { SELECT_OPTIONS_INQURIY_TYPE } from '@constants/select';

import { InquiryItem } from '@type/inquiry';

const ABOUT_CLUB = 'ABOUT_CLUB';
const ABOUT_UNIVERCITY = 'ABOUT_UNIVERCITY';
export const faqData = [
  {
    value: ABOUT_CLUB,
    item: [
      {
        id: 1,
        question: '스터디는 누구나 만들 수 있나요?',
        answer: '그럴껄요?????????',
      },
      {
        id: 2,
        question: '스터디는 누구나 만들 수 있나요?',
        answer: '그럴껄요?????????',
      },
      {
        id: 3,
        question: '스터디는 누구나 만들 수 있나요?',
        answer: '그럴껄요?????????',
      },
      {
        id: 4,
        question: '스터디는 누구나 만들 수 있나요?',
        answer: '그럴껄요?????????',
      },
      {
        id: 5,
        question: '스터디는 누구나 만들 수 있나요?',
        answer: '그럴껄요?????????',
      },
    ],
  },
  {
    value: ABOUT_UNIVERCITY,
    item: [
      {
        id: 1,
        question: '학교가야 되나요',
        answer: '그럴껄요?????????',
      },
      {
        id: 2,
        question: '학교가야 되나요',
        answer: '그럴껄요?????????',
      },
      {
        id: 3,
        question: '학교가야 되나요',
        answer: '그럴껄요?????????',
      },
      {
        id: 4,
        question: '학교가야 되나요',
        answer: '그럴껄요?????????',
      },
      {
        id: 5,
        question: '학교가야 되나요',
        answer: '그럴껄요?????????',
      },
    ],
  },
];
export const inquiryData: InquiryItem[] = [
  {
    id: 1,
    title:
      '이미지가 업로드되지 않아요이미지가 업로드되지 않아요이미지가 업로드되지 않아요이미지가 업로드되지 않아요이미지가 업로드되지 않아요',
    content:
      '이미지 업로드 버튼을 눌러도 반응이 없어요.이미지 업로드 버튼을 눌러도 반응이 없어요.이미지 업로드 버튼을 눌러도 반응이 없어요.이미지 업로드 버튼을 눌러도 반응이 없어요.이미지 업로드 버튼을 눌러도 반응이 없어요.이미지 업로드 버튼을 눌러도 반응이 없어요.이미지 업로드 버튼을 눌러도 반응이 없어요.이미지 업로드 버튼을 눌러도 반응이 없어요.',
    category: SELECT_OPTIONS_INQURIY_TYPE[0].value,
    memberId: 'user001',
    memberName: '김민수',
    createdAt: '2025-05-20T10:00:00Z',
    imageUrl: 'https://picsum.photos/200/300',
    isOwner: true,
    isAnswered: true,
    answer: '이미지 용량 제한(5MB 이하)을 확인해주세요.',
    responder: '운영자 이가영',
    answeredAt: '2025-05-21T09:30:00Z',
  },
  {
    id: 2,
    title: '회원탈퇴는 어디서 하나요?',
    content: '설정에서 못 찾겠어요.',
    category: SELECT_OPTIONS_INQURIY_TYPE[1].value,
    memberId: 'user002',
    memberName: '이현우',
    createdAt: '2025-05-19T13:45:00Z',
    isOwner: true,
    isAnswered: false,
  },
  {
    id: 3,
    title: '다크모드 추가 계획 있나요?',
    content: '눈이 아파서 다크모드가 필요해요.',
    category: SELECT_OPTIONS_INQURIY_TYPE[1].value,
    memberId: 'user003',
    memberName: '박지연',
    createdAt: '2025-05-18T08:15:00Z',
    isOwner: true,
    isAnswered: true,
    answer: '다크모드는 6월 업데이트에 포함될 예정입니다.',
    responder: '운영자 황진산',
    answeredAt: '2025-05-19T10:00:00Z',
  },
  {
    id: 4,
    title: '버튼이 클릭되지 않아요',
    content: '모바일에서 버튼이 작동하지 않아요.',
    category: SELECT_OPTIONS_INQURIY_TYPE[0].value,
    memberId: 'user004',
    memberName: '최은서',
    createdAt: '2025-05-17T16:30:00Z',
    isOwner: false,
    isAnswered: false,
  },
  {
    id: 5,
    title: '비밀번호 찾기 기능 오류',
    content: '비밀번호 찾기 이메일이 오지 않아요.',
    category: SELECT_OPTIONS_INQURIY_TYPE[0].value,
    memberId: 'user005',
    memberName: '정우성',
    createdAt: '2025-05-16T11:20:00Z',
    isOwner: false,
    isAnswered: true,
    answer: '스팸 메일함을 확인해주세요. 계속 안 될 경우 문의 바랍니다.',
    responder: '운영자 이지은',
    answeredAt: '2025-05-16T13:00:00Z',
  },
  {
    id: 6,
    title: '이용약관 링크가 작동하지 않아요',
    content: '푸터에 있는 이용약관 링크를 눌러도 페이지가 안 열립니다.',
    category: SELECT_OPTIONS_INQURIY_TYPE[0].value,
    memberId: 'user006',
    memberName: '강다현',
    createdAt: '2025-05-15T09:00:00Z',
    isOwner: false,
    isAnswered: false,
  },
  {
    id: 7,
    title: '닉네임 변경은 어디서 하나요?',
    content: '설정에서 닉네임 변경 메뉴가 안 보여요.',
    category: SELECT_OPTIONS_INQURIY_TYPE[1].value,
    memberId: 'user007',
    memberName: '한지민',
    createdAt: '2025-05-14T17:10:00Z',
    isOwner: false,
    isAnswered: true,
    answer: '설정 > 프로필 수정 메뉴에서 변경 가능합니다.',
    responder: '운영자 정재훈',
    answeredAt: '2025-05-14T18:00:00Z',
  },
  {
    id: 8,
    title: '문의글은 비공개인가요?',
    content: '다른 사람들이 제 문의를 볼 수 있나요?',
    category: SELECT_OPTIONS_INQURIY_TYPE[1].value,
    memberId: 'user008',
    memberName: '오세훈',
    createdAt: '2025-05-13T14:30:00Z',
    isOwner: false,
    isAnswered: false,
  },
  {
    id: 9,
    title: '알림 설정이 저장되지 않아요',
    content: '알림을 꺼도 다시 켜져 있어요.',
    category: SELECT_OPTIONS_INQURIY_TYPE[0].value,
    memberId: 'user009',
    memberName: '유재석',
    createdAt: '2025-05-12T10:10:00Z',
    isOwner: false,
    isAnswered: true,
    answer: '버그 확인 후 수정 중입니다. 빠른 시일 내 해결 예정입니다.',
    responder: '운영자 김소연',
    answeredAt: '2025-05-13T09:00:00Z',
  },
  {
    id: 10,
    title: 'C-Lab 포인트 제도 문의',
    content: '포인트는 어떻게 적립되나요?',
    category: SELECT_OPTIONS_INQURIY_TYPE[1].value,
    memberId: 'user010',
    memberName: '장도윤',
    createdAt: '2025-05-11T08:45:00Z',
    isOwner: true,
    isAnswered: true,
    answer: '활동별로 자동 적립되며, 마이페이지에서 확인할 수 있어요.',
    responder: '운영자 김보민',
    answeredAt: '2025-05-11T11:00:00Z',
  },
];

export const WriteIntroduceData = [
  {
    id: 1,
    question: '문의사항이 있어요!',
    answer: '문의사항이 있다면 어떻게 해야하는지 모르겠는데뭐라곤 적어놔야하',
  },
  {
    id: 2,
    question: '버그를 발견했어요!',
    answer: '버그가 있다면 어떻게 해야하는지 모르겠는데뭐라곤 적어놔야ㅕㅎ',
  },
];
export const bugDefaultValue = `
🐞 버그 요약
- 어떤 문제가 있었나요? [여기에 버그를 간단히 설명해주세요]

🧪 재현 방법
1. 어떤 상황에서 발생했나요? [예: 로그인 후 게시글 작성 시]
2. 어떤 환경에서 발생했나요? [예: Chrome, iPhone]

✅ 기대한 동작
- 원래 어떻게 작동해야 하나요? [예: 작성 후 저장되어야 함]

📎 참고자료 (선택)
- 스크린샷이나 파일을 첨부해주셔도 좋아요!
`.trim();

export const inquiryDefaultValue = `
💬 문의 또는 건의 내용
- 어떤 점이 궁금하거나, 개선하고 싶은 부분이 있으신가요? [예: 메뉴 위치 변경 건의, 동아리 활동 관련 문의]

🧠 배경 또는 이유
- 왜 이런 문의/건의를 하게 되었는지 알려주세요. [예: 찾기 어려워서 불편함, 올해 활동이 무엇이 있는지 궁금함]

📎 참고자료 또는 아이디어 (선택)
- 디자인, 예시 링크 등 추가 자료가 있다면 공유해주세요!
`.trim();
