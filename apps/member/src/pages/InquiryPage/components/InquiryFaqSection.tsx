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
  const [menu, setMenu] = useState(MenubarItems[0]);

  const handleMenuClick = (item: { name: string; value: string }) => () => {
    setMenu(item);
  };

  const currentData = faqData.find((item) => item.value === menu.value);
  const currentItems = currentData ? currentData.item : [];

  return (
    <Section>
      <Section.Header title="FAQ">
        <Menubar className="hidden sm:flex">
          {MenubarItems.map((item) => (
            <Menubar.Item
              selected={menu.value === item.value}
              key={item.value}
              onClick={handleMenuClick(item)}
            >
              {item.name}
            </Menubar.Item>
          ))}
        </Menubar>
        <Menubar className="flex sm:hidden">
          {MenubarItems.map((item) => (
            <Menubar.Item
              selected={menu.value === item.value}
              key={item.value}
              onClick={handleMenuClick(item)}
            >
              {item.name}
            </Menubar.Item>
          ))}
        </Menubar>
      </Section.Header>
      <Section.Body>
        <div className="flex flex-col gap-4">
          <Accodion items={currentItems} resetKey={menu.value} />
        </div>
      </Section.Body>
    </Section>
  );
};

export default InquiryFqaSetion;
