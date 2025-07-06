import { useState } from 'react';

import { Menubar } from '@clab-platforms/design-system';

import { Section } from '@components/common/Section';

import Accordion from './Accordion';

const CATEGORY = {
  MEMBERS: 'MEMBERS',
  CLUB: 'CLUB',
};

const faqData = [
  {
    value: CATEGORY.MEMBERS,
    item: [
      {
        id: 1,
        question: '비밀번호를 잊어버렸어요.',
        answer: `운영진에게 이름과 학번을 같이 전달해 주시면 비밀번호 재설정 메일을 보내드려요. 
        메일에 전송된 비밀번호로 로그인한 후에는 꼭 비밀번호를 바꿔주세요.`,
      },
      {
        id: 2,
        question: '제안하고 싶은 기능이 있어요.',
        answer: `C-Lab Core Team은 다양한 의견을 환영해요! 
        운영진을 통해서 전달해 주시거나, 팀원에게 직접 연락을 주셔도 좋아요. 기다리고 있어요. :)`,
      },
      {
        id: 3,
        question: '맴버스 서비스는 누가 관리하고 있나요?',
        answer: `C-Lab 소속 개발팀인 C-Lab Core Team에서 운영하고 있어요. 
        서비스 이용이나 팀에 대한 궁금증이 있다면 언제든지 연락해 주세요!`,
      },
    ],
  },
  {
    value: CATEGORY.CLUB,
    item: [
      {
        id: 1,
        question: '스터디 커리큘럼이 있나요?',
        answer: `네, 있습니다. 1학년은 C언어와 자료구조를 중심으로 기초 역량을 다지는 스터디에 필수로 참여해야 해요. 
        2학년부터는 서버, 웹, 게임 등 다양한 분야 중 관심 있는 파트를 선택해 스터디를 진행하게 돼요.`,
      },
      {
        id: 2,
        question: '스터디나 프로젝트는 어떻게 모집하나요?',
        answer: `동아리 내 카카오톡 단체방이나 디스코드 채널을 통해 모집이 이루어저요. 
        재학생과 졸업생이 함께 자유롭게 스터디나 프로젝트를 구성할 수 있어요.`,
      },
      {
        id: 3,
        question: '동아리 행사도 있나요?',
        answer: `네, 다양한 행사가 열려요. 개강총회, 종강총회, 그리고 여름 방학 MT는 매년 진행되는 주요 행사 중 하나예요! 
          또한 해커톤, 컨퍼런스 등 개발 역량을 쌓을 수 있는 활동도 다양하게 열리고 있어요.`,
      },
      {
        id: 4,
        question: '3, 4학년은 어떤 활동을 하나요?',
        answer: `3, 4학년에게는 별도의 필수 활동은 없어요. 
          다만, 원하는 경우 자유롭게 스터디를 만들거나 프로젝트 인원을 모집하여 활발히 활동할 수 있어요!`,
      },
    ],
  },
];

const MenubarItems = [
  { name: '멤버스 이용', value: CATEGORY.MEMBERS },
  { name: '동아리 활동', value: CATEGORY.CLUB },
];

const SupportFqaSection = () => {
  const [selectedMenu, setMenu] = useState(CATEGORY.MEMBERS);

  const handleSelectedMenuClick = (value: string) => () => {
    setMenu(value);
  };

  const currentData = faqData.find((item) => item.value === selectedMenu);
  const currentItems = currentData ? currentData.item : [];

  return (
    <Section>
      <Section.Header title="FAQ">
        <Menubar className="flex">
          {MenubarItems.map(({ name, value }) => (
            <Menubar.Item
              selected={selectedMenu === value}
              key={value}
              onClick={handleSelectedMenuClick(value)}
            >
              {name}
            </Menubar.Item>
          ))}
        </Menubar>
      </Section.Header>
      <Section.Body>
        <div className="flex flex-col gap-4">
          <Accordion items={currentItems} resetKey={selectedMenu} />
        </div>
      </Section.Body>
    </Section>
  );
};

export default SupportFqaSection;
