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
        <div className="flex text-xl font-bold items-center">
          {title.map((name, index) => (
            <Fragment key={name}>
              <span className="hover:bg-gray-100 rounded-lg cursor-pointer px-2 transition-colors">
                {name}
              </span>
              {index !== title.length - 1 && <GrNext />}
            </Fragment>
          ))}
        </div>
      );
    } else {
      // 제목이 하나일 경우
      return <h1 className="text-xl font-bold px-2">{title}</h1>;
    }
  };

  return (
    <div className="flex justify-between items-center rounded-lg border bg-white py-4 px-2">
      <RenderTitle />
      <div className="flex items-center gap-4">{children}</div>
    </div>
  );
};

export default Header;
