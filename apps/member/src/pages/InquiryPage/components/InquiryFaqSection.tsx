import { useState } from 'react';

import { Menubar } from '@clab-platforms/design-system';

import { Section } from '@components/common/Section';

import faqData from '@mocks/data/inquiryFaq.json';

import Accodion from './Accodion';

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
