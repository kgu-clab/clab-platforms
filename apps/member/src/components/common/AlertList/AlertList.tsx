import { useState } from 'react';
import DropdownButton from '../DropdownButton/DropdownButton';
import Alert from '../Alert/Alert';
import classNames from 'classnames';
import Card from '../Card/Card';

interface AlertListProps {
  data: {
    id: number;
    to: string;
    title: string;
    date: string;
  }[];
}

const AlertList = ({ data }: AlertListProps) => {
  const [open, setOpen] = useState(false);

  if (data.length <= 0) return;

  if (data.length > 1) {
    const { to, title, date } = data[0]; // Header

    return (
      <Card>
        <div className="flex w-full items-center gap-2 divide-x">
          <Alert to={to} title={title} date={date} />
          <DropdownButton
            className="pl-2"
            isOpen={open}
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div
          className={classNames(
            'overflow-hidden transition duration-500 ease-in-out',
            open ? 'opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <hr className="my-4" />
          <div className="flex flex-col gap-4">
            {data.slice(1).map(({ id, to, title, date }) => (
              <Alert key={id} to={to} title={title} date={date} />
            ))}
          </div>
        </div>
      </Card>
    );
  } else {
    // this is the only alert
    const { to, title, date } = data[0];

    return (
      <Card>
        <div className="flex w-full items-center gap-2">
          <Alert to={to} title={title} date={date} />
        </div>
      </Card>
    );
  }
};

export default AlertList;
