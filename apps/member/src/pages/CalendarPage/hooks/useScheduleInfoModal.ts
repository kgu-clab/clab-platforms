import { useMemo } from 'react';

import { useModal } from '@hooks/common/useModal';
import { formattedDatePeriod } from '@utils/date';

interface Options {
  startDateTime: string;
  endDateTime: string;
  detail: string;
}

export function useScheduleInfoModal() {
  const { open } = useModal();

  return useMemo(
    () => ({
      open: (options: Options) =>
        open({
          title: '📆 일정',
          content: `일시: ${formattedDatePeriod(options.startDateTime, options.endDateTime)}\n내용: ${options.detail}`,
        }),
    }),
    [open],
  );
}
