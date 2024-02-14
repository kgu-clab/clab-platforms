import { QUERY_KEY } from '@constants/key';
import { getBirthday } from '@api/birthday';
import { useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

const today = dayjs();

export const useBirthday = (month = today.get('M') + 1, page = 0, size = 6) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.BIRTHDAY, month, page, size],
    queryFn: () => getBirthday(month, page, size),
  });
};
