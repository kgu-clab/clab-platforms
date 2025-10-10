import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  Button,
  Grid,
  Input,
  Menubar,
  Table,
} from '@clab-platforms/design-system';
import { toDecodeHTMLEntities } from '@clab-platforms/utils';

import ActionButton from '@components/common/ActionButton/ActionButton';
import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';
import Textarea from '@components/common/Textarea/Textarea';

import { PATH } from '@constants/path';
import { usePagination } from '@hooks/common/usePagination';
import { useToast } from '@hooks/common/useToast';
import { useView } from '@hooks/common/useView';
import { useDeleteModal } from '@hooks/modal/useDeleteModal';
import { useSchedule } from '@hooks/queries';
import { formattedDate, now } from '@utils/date';

import { useScheduleDeleteMutation } from '../hooks/useScheduleDeleteMutation';
import { useScheduleMutation } from '../hooks/useScheduleMutation';

type Mode = 'view' | 'add';

export function CalendarSection() {
  const navigate = useNavigate();
  const { open } = useDeleteModal();
  const { view, handleViewClick } = useView<Mode>('view');
  const { page, size, handlePageChange } = usePagination({
    sectionName: 'calendar',
  });

  const { data } = useSchedule({
    // 오늘 기준으로 최근 1년 부터 ~ 이번달 까지
    startDate: now().subtract(1, 'year').toString(),
  });
  const { mutate: scheduleDeleteMutate } = useScheduleDeleteMutation();

  const handleDeleteButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ) => {
    e.stopPropagation();
    return open({
      title: '일정',
      onClick: () => scheduleDeleteMutate(id),
    });
  };

  const renderView = {
    view: (
      <Table head={['번호', '제목', '시작일', '종료일', '기능']}>
        {data.items.map(({ id, title, startDateTime, endDateTime }) => (
          <Table.Row
            key={id}
            className="text-nowrap text-center"
            onClick={() => navigate(PATH.CALENDER)}
          >
            <Table.Cell>{id}</Table.Cell>
            <Table.Cell className="w-full truncate text-left">
              {toDecodeHTMLEntities(title)}
            </Table.Cell>
            <Table.Cell>{formattedDate(startDateTime)}</Table.Cell>
            <Table.Cell>{formattedDate(endDateTime)}</Table.Cell>

            <Table.Cell className="space-x-2">
              <ActionButton
                color="red"
                onClick={(e) => handleDeleteButtonClick(e, id)}
              >
                삭제
              </ActionButton>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>
    ),
    add: <ScheduleForm onSubmit={() => handleViewClick('view')} />,
  }[view];

  return (
    <Section>
      <Section.Header
        title="일정"
        description="일정을 추가하거나 삭제할 수 있어요"
      >
        <Menubar>
          <Menubar.Item
            selected={view === 'view'}
            onClick={() => handleViewClick('view')}
          >
            보기
          </Menubar.Item>
          <Menubar.Item
            selected={view === 'add'}
            onClick={() => handleViewClick('add')}
          >
            추가
          </Menubar.Item>
        </Menubar>
      </Section.Header>
      <Section.Body>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">{renderView}</div>
        </div>
        {view === 'view' && (
          <Pagination
            className="mt-4 justify-center"
            totalItems={data.totalItems}
            postLimit={size}
            onChange={handlePageChange}
            page={page}
          />
        )}
      </Section.Body>
    </Section>
  );
}

interface ScheduleFormProps {
  onSubmit: () => void;
}

export function ScheduleForm({ onSubmit }: ScheduleFormProps) {
  const { addToast } = useToast();
  const [inputs, setInputs] = useState({
    title: '',
    detail: '',
    startDateTime: '',
    endDateTime: '',
  });

  const { mutate: scheduleMutate } = useScheduleMutation();

  const { title, detail, startDateTime, endDateTime } = inputs;

  const handleInputsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitClick = () => {
    if (!title || !detail || !startDateTime || !endDateTime) {
      return addToast({
        state: 'error',
        message: '모든 항목을 입력해주세요.',
      });
    }
    scheduleMutate(
      {
        scheduleType: 'ALL',
        title,
        detail,
        startDateTime,
        endDateTime,
        priority: 'HIGH',
      },
      {
        onSuccess: () => onSubmit(),
      },
    );
  };

  return (
    <div className="space-y-2">
      <Input
        label="일정명"
        id="title"
        name="title"
        placeholder="일정명을 입력해주세요."
        value={title}
        onChange={handleInputsChange}
      />
      <Textarea
        label="내용"
        id="detail"
        name="detail"
        placeholder="내용을 입력해주세요."
        maxLength={200}
        value={detail}
        onChange={handleInputsChange}
      />
      <Grid gap="md" col="2">
        <Input
          label="시작일"
          type="datetime-local"
          id="startDateTime"
          name="startDateTime"
          value={startDateTime}
          onChange={handleInputsChange}
        />
        <Input
          label="마감일"
          type="datetime-local"
          id="endDateTime"
          name="endDateTime"
          value={endDateTime}
          onChange={handleInputsChange}
        />
      </Grid>
      <Button className="w-full" onClick={handleSubmitClick}>
        일정 추가하기
      </Button>
    </div>
  );
}
