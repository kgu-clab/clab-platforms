import { Fragment } from 'react';
import { GrNext } from 'react-icons/gr';

interface HeaderProps {
  title: string | string[];
  children?: React.ReactNode;
}

const Header = ({ title, children }: HeaderProps) => {
  const RenderTitle = () => {
    if (Array.isArray(title)) {
      return (
        <div className="flex text-xl font-bold items-center">
          {title.map((name, index) => (
            <Fragment key={name}>
              <span className="hover:bg-gray-100 rounded-lg cursor-pointer">
                {name}
              </span>
              {index !== title.length - 1 && <GrNext className="mx-2" />}
            </Fragment>
          ))}
        </div>
      );
    }

    return <h1 className="text-xl font-bold">{title}</h1>;
  };

  return (
    <div className="flex justify-between items-center rounded-lg border bg-white p-4">
      <RenderTitle />
      <div className="flex gap-4">{children}</div>
    </div>
  );
};

export default Header;
