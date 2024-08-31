import { DAY, DAY_VALUE_ARRAY } from '@/shared/constants';
import { DayKor } from '@/shared/types';
import { getFormattedDate } from '@/shared/utils';
import { GetLectureByParamsValue } from '@/widgets/time-table/api';
import {
  DAY_PERIOD,
  DAY_PERIOD_ARRAY,
  NIGHT_PERIOD,
  NIGHT_PERIOD_ARRAY,
  PERIOD_STATUS,
  SPECIAL_PERIOD,
} from '@/widgets/time-table/model';
import type { DayStatus, PeriodStatus } from '@/widgets/time-table/types';

interface GetLectureFillRangeParams<T> {
  dayStatus: DayStatus;
  start: T;
  end: T;
}

interface GetFormattedLectureListParams {
  dayStatus: DayStatus;
  values: GetLectureByParamsValue[] | undefined;
}

interface LectureItem {
  type: PeriodStatus;
  value?: GetLectureByParamsValue;
  head?: boolean;
}

export interface BasicLectureGroup {
  [key: string]: LectureItem[];
}

export function getLectureFillRange<T>({
  dayStatus,
  start,
  end,
}: GetLectureFillRangeParams<T>) {
  const selectedPeriod =
    dayStatus === 'day' ? DAY_PERIOD_ARRAY : NIGHT_PERIOD_ARRAY;
  const startPeriodIdx = selectedPeriod.findIndex(([key]) => key === start);
  const endPeriodIdx = selectedPeriod.findIndex(([key]) => key === end);
  const startPeriodDate = getFormattedDate({
    hour: selectedPeriod[startPeriodIdx][1].start.hour,
    minute: selectedPeriod[startPeriodIdx][1].start.minute,
  }).getTime();
  const endPeriodDate = getFormattedDate({
    hour: selectedPeriod[endPeriodIdx][1].end.hour,
    minute: selectedPeriod[endPeriodIdx][1].end.minute,
  }).getTime();
  const rangeArr: T[] = [];

  selectedPeriod.forEach(([key, obj]) => {
    const targetStartDate = getFormattedDate({
      hour: obj.start.hour,
      minute: obj.start.minute,
    }).getTime();
    const targetEndDate = getFormattedDate({
      hour: obj.end.hour,
      minute: obj.end.minute,
    }).getTime();

    if (startPeriodDate <= targetStartDate && targetEndDate <= endPeriodDate) {
      rangeArr.push(key as T);
    }
  });

  return rangeArr;
}

export function getFormattedLectureList({
  dayStatus,
  values,
}: GetFormattedLectureListParams) {
  const selectedPeriod = dayStatus === 'day' ? DAY_PERIOD : NIGHT_PERIOD;
  const dayLength = Object.keys(DAY).length;
  const defaultLectureValue: LectureItem = {
    type: PERIOD_STATUS.empty,
  };
  const basicLectureGroup: BasicLectureGroup = Object.fromEntries(
    Object.keys(selectedPeriod).map((key) => [
      key,
      Array.from({ length: dayLength }, () => ({ ...defaultLectureValue })),
    ]),
  );
  const specialPeriodSet = new Set<string>(SPECIAL_PERIOD);
  const specialLectureGroup: GetLectureByParamsValue[] = [];

  if (!values) {
    return {
      basicLectureGroup,
      specialLectureGroup,
    };
  }

  for (let i = 0; i < values.length; i += 1) {
    if (specialPeriodSet.has(values[i].time)) {
      specialLectureGroup.push(values[i]);
    } else {
      const splitTime = values[i].time.split(',');

      for (let j = 0; j < splitTime.length; j += 1) {
        const splitSection = splitTime[j].split(' ');
        const day = splitSection.shift() as DayKor;
        const dayOrder = DAY_VALUE_ARRAY.indexOf(day);
        const selectedRange = getLectureFillRange({
          dayStatus,
          start: splitSection[0],
          end: splitSection[splitSection.length - 1],
        });

        for (let k = 0; k < selectedRange.length; k += 1) {
          const period = selectedRange[k];

          if (
            basicLectureGroup[period][dayOrder].type === PERIOD_STATUS.empty
          ) {
            basicLectureGroup[period][dayOrder].type = PERIOD_STATUS.fill;
            basicLectureGroup[period][dayOrder].value = values[i];
            basicLectureGroup[period][dayOrder].head = k === 0;
          } else {
            return {
              basicLectureGroup: Object.fromEntries(
                Object.keys(selectedPeriod).map((key) => [
                  key,
                  Array.from({ length: dayLength }, () => ({
                    ...defaultLectureValue,
                  })),
                ]),
              ),
              specialLectureGroup: [],
              error: true,
            };
          }
        }
      }
    }
  }

  return {
    basicLectureGroup,
    specialLectureGroup,
    error: false,
  };
}
