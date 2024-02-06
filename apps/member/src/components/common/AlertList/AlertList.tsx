import { useState } from 'react';
import DropdownButton from '../DropdownButton/DropdownButton';
import Alert from '../Alert/Alert';
import classNames from 'classnames';
import Section from '../Section/Section';
import { ScheduleItem } from '@type/schedule';

interface AlertListProps {
  data: Array<ScheduleItem>;
}

const AlertList = ({ data }: AlertListProps) => {
  const [open, setOpen] = useState(false);

  if (data.length <= 0) return;

  if (data.length > 1) {
    const { to, title, startDate } = data[0]; // Header

    return (
      <Section>
        <div className="flex w-full items-center gap-2 divide-x">
          <Alert to={to ? to : ''} title={title} date={startDate} />
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
            {data.slice(1).map(({ id, to, title, startDate }) => (
              <Alert
                key={id}
                to={to ? to : ''}
                title={title}
                date={startDate}
              />
            ))}
          </div>
        </div>
      </Section>
    );
  } else {
    // this is the only alert
    const { to, title, startDate } = data[0];

    return (
      <Section>
        <div className="flex w-full items-center gap-2">
          <Alert to={to ? to : ''} title={title} date={startDate} />
        </div>
      </Section>
    );
  }
};

export default AlertList;
