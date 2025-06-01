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
        question: '멤버스는 어떻게 가입하나요?',
        answer: '멤버스 가입 방법을 안내해드릴게요...',
      },
      {
        id: 2,
        question: '프로필은 어떻게 수정하나요?',
        answer: '프로필 수정 방법을 설명해드릴게요...',
      },
      {
        id: 3,
        question: '알림 설정은 어디서 변경하나요?',
        answer: '알림 설정 변경 방법을 안내해드릴게요...',
      },
      {
        id: 4,
        question: '게시글은 어떻게 작성하나요?',
        answer: '게시글 작성 방법을 설명해드릴게요...',
      },
      {
        id: 5,
        question: '스터디 참여는 어떻게 하나요?',
        answer: '스터디 참여 방법을 안내해드릴게요...',
      },
    ],
  },
  {
    value: CATEGORY.CLUB,
    item: [
      {
        id: 1,
        question: '스터디는 누구나 만들 수 있나요?',
        answer: '네, 모든 동아리 회원이 스터디를 개설할 수 있습니다...',
      },
      {
        id: 2,
        question: '프로젝트 팀은 어떻게 구성되나요?',
        answer: '프로젝트 팀 구성 방법을 설명해드릴게요...',
      },
      {
        id: 3,
        question: '정기 모임은 언제 있나요?',
        answer: '정기 모임 일정을 안내해드릴게요...',
      },
      {
        id: 4,
        question: '세미나는 어떻게 진행되나요?',
        answer: '세미나 진행 방식을 설명해드릴게요...',
      },
      {
        id: 5,
        question: '멘토링 프로그램은 어떻게 참여하나요?',
        answer: '멘토링 프로그램 참여 방법을 안내해드릴게요...',
      },
    ],
  },
];

const MenubarItems = [
  { name: '멤버스 이용', value: CATEGORY.MEMBERS },
  { name: '동아리 활동', value: CATEGORY.CLUB },
];

const InquiryFqaSection = () => {
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

export default InquiryFqaSection;
