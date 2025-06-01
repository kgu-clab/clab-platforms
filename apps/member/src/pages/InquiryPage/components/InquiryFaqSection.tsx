import { useState } from 'react';

import { Menubar } from '@clab-platforms/design-system';

import { Section } from '@components/common/Section';

import Accodion from './Accodion';

const faqData = [
  {
    value: 'ABOUT_CLUB',
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
    value: 'ABOUT_UNIVERCITY',
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

const ABOUT = {
  CLUB: 'ABOUT_CLUB',
  UNIVERCITY: 'ABOUT_UNIVERCITY',
};

const MenubarItems = [
  { name: '동아리 활동', value: ABOUT.CLUB },
  { name: '학교 생활', value: ABOUT.UNIVERCITY },
];

const InquiryFqaSetion = () => {
  const [selectedMenu, setMenu] = useState(ABOUT.CLUB);

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
          <Accodion items={currentItems} resetKey={selectedMenu} />
        </div>
      </Section.Body>
    </Section>
  );
};

export default InquiryFqaSetion;
