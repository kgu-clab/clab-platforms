import type { Values } from '@/types';

export const VALUES: Values = [
  {
    keyword: 'SHARE',
    description:
      '공부한 내용을 동아리원들과 함께 나누며 다 같이 더 높이 성장해요.',
  },
  {
    keyword: 'IMAGINE',
    description:
      '프로젝트를 진행하며 본인이 상상하던 서비스를 직접 개발해봐요.',
  },
  {
    keyword: 'PASSION',
    description:
      '열정을 가진 동아리원들과 개발자로서의 꿈과 실력을 키워나가요.',
  },
  {
    keyword: 'ENJOY',
    description:
      '총회, MT 등 다양한 이벤트를 함께하며 즐거운 동아리 생활을 해요.',
  },
  {
    keyword: 'HARMONY',
    description:
      '서로 다른 색을 가진 동아리 구성원들이 어울리며, 시너지를 만들어요.',
  },
  {
    keyword: 'CONNECT',
    description:
      '동기들뿐만 아니라 동아리의 선후배들과 연결되어 많은 도움을 받아요.',
  },
];

export const KEYWORDS = VALUES.map((value) => value.keyword);
