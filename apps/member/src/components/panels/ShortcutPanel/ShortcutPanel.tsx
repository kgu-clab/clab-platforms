import { useLocation } from 'react-router';

import { ChevronRightOutline, SettingsColor } from '@clab-platforms/icon';

import Panel from '@components/common/Panel/Panel';

import { PATH } from '@constants/path';

export default function ShortcutPanel() {
  const headers = Array.from(document.querySelectorAll('h2'));
  const location = useLocation();

  return (
    <>
      {location.pathname === PATH.MANAGE && (
        <Panel className="sticky top-20">
          <Panel.Header
            icon={<SettingsColor />}
            label="바로가기"
            description="클릭 시 해당 메뉴로 이동합니다."
          />
          <Panel.Body>
            <ul className="list-disc space-y-2 text-gray-400">
              {headers.map((h2) => (
                <li
                  key={`shortcut-${h2.id}`}
                  className="group flex justify-between"
                >
                  <a
                    href={`#${h2.id}`}
                    className="transition-all group-hover:translate-x-2 group-hover:font-bold group-hover:text-black"
                  >
                    {h2.innerText}
                  </a>
                  <ChevronRightOutline
                    className="opacity-0 transition-all group-hover:text-black group-hover:opacity-100"
                    width={12}
                    height={12}
                  />
                </li>
              ))}
            </ul>
          </Panel.Body>
        </Panel>
      )}
    </>
  );
}
