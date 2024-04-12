import { Fragment } from 'react';
import { GrNext } from 'react-icons/gr';

interface HeaderProps {
  title: string | string[];
  children?: React.ReactNode;
}

const Header = ({ title, children }: HeaderProps) => {
  const RenderTitle = () => {
    if (Array.isArray(title)) {
      // 배열일 경우, 제목이 여러 개일 경우
      return (
        <div className="flex items-center text-xl font-bold">
          {title.map((name, index) => (
            <Fragment key={index}>
              <span className="cursor-pointer rounded-lg px-2 transition-colors hover:bg-gray-100">
                {name}
              </span>
              {index !== title.length - 1 && <GrNext />}
            </Fragment>
          ))}
        </div>
      );
    } else {
      // 제목이 하나일 경우
      return <h1 className="px-2 text-xl font-bold">{title}</h1>;
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border bg-white px-2 py-4">
      <RenderTitle />
      <div className="flex items-center gap-4 pr-2">{children}</div>
    </div>
  );
};

export default Header;
