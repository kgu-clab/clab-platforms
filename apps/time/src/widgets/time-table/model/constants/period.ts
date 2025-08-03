export const DAY_PERIOD = {
  '1': {
    start: { hour: 9, minute: 0 },
    end: { hour: 9, minute: 50 },
    string: '9 ~ 09:50',
  },
  // '1L': {
  //   start: { hour: 9, minute: 0 },
  //   end: { hour: 10, minute: 15 },
  //   string: '09:00 ~ 10:15',
  // },
  '2': {
    start: { hour: 10, minute: 0 },
    end: { hour: 10, minute: 50 },
    string: '10 ~ 10:50',
  },
  // '2L': {
  //   start: { hour: 10, minute: 0 },
  //   end: { hour: 11, minute: 15 },
  //   string: '10:00 ~ 11:15',
  // },
  // '2.5L': {
  //   start: { hour: 10, minute: 30 },
  //   end: { hour: 11, minute: 45 },
  //   string: '10:30 ~ 11:45',
  // },
  '3': {
    start: { hour: 11, minute: 0 },
    end: { hour: 11, minute: 50 },
    string: '11 ~ 11:50',
  },
  // '3L': {
  //   start: { hour: 11, minute: 0 },
  //   end: { hour: 12, minute: 15 },
  //   string: '11:00 ~ 12:15',
  // },
  '4': {
    start: { hour: 12, minute: 0 },
    end: { hour: 12, minute: 50 },
    string: '12 ~ 12:50',
  },
  // '4L': {
  //   start: { hour: 12, minute: 0 },
  //   end: { hour: 13, minute: 15 },
  //   string: '12:00 ~ 13:15',
  // },
  '5': {
    start: { hour: 13, minute: 0 },
    end: { hour: 13, minute: 50 },
    string: '13 ~ 13:50',
  },
  // '5.5L': {
  //   start: { hour: 13, minute: 30 },
  //   end: { hour: 14, minute: 45 },
  //   string: '13:30 ~ 14:45',
  // },
  '6': {
    start: { hour: 14, minute: 0 },
    end: { hour: 14, minute: 50 },
    string: '14 ~ 14:50',
  },
  // '6L': {
  //   start: { hour: 14, minute: 0 },
  //   end: { hour: 15, minute: 15 },
  //   string: '14:00 ~ 14:15',
  // },
  '7': {
    start: { hour: 15, minute: 0 },
    end: { hour: 15, minute: 50 },
    string: '15 ~ 15:50',
  },
  // '7L': {
  //   start: { hour: 15, minute: 0 },
  //   end: { hour: 16, minute: 15 },
  //   string: '15:00 ~ 16:15',
  // },
  // '7.5L': {
  //   start: { hour: 15, minute: 30 },
  //   end: { hour: 16, minute: 45 },
  //   string: '15:30 ~ 16:45',
  // },
  '8': {
    start: { hour: 16, minute: 0 },
    end: { hour: 16, minute: 50 },
    string: '16 ~ 16:50',
  },
  '9': {
    start: { hour: 17, minute: 0 },
    end: { hour: 17, minute: 50 },
    string: '17 ~ 17:50',
  },
} as const;

export const NIGHT_PERIOD = {
  '1': {
    start: { hour: 17, minute: 50 },
    end: { hour: 18, minute: 35 },
    string: '17 ~ 18:35',
  },
  '2': {
    start: { hour: 18, minute: 40 },
    end: { hour: 19, minute: 25 },
    string: '18 ~ 19:25',
  },
  '3': {
    start: { hour: 19, minute: 30 },
    end: { hour: 20, minute: 15 },
    string: '19 ~ 20:15',
  },
  '4': {
    start: { hour: 20, minute: 20 },
    end: { hour: 21, minute: 5 },
    string: '20 ~ 21:05',
  },
  '5': {
    start: { hour: 21, minute: 10 },
    end: { hour: 21, minute: 55 },
    string: '21 ~ 21:55',
  },
  '6': {
    start: { hour: 22, minute: 0 },
    end: { hour: 22, minute: 45 },
    string: '22 ~ 22:45',
  },
} as const;

export const DAY_PERIOD_ARRAY = Object.entries(DAY_PERIOD).sort(
  ([, periodA], [, periodB]) => {
    const timeA = periodA.start.hour * 60 + periodA.start.minute;
    const timeB = periodB.start.hour * 60 + periodB.start.minute;

    return timeA - timeB;
  },
);

export const NIGHT_PERIOD_ARRAY = Object.entries(NIGHT_PERIOD).sort(
  ([, periodA], [, periodB]) => {
    const timeA = periodA.start.hour * 60 + periodA.start.minute;
    const timeB = periodB.start.hour * 60 + periodB.start.minute;

    return timeA - timeB;
  },
);

export const SPECIAL_PERIOD = ['이러닝', '교외수업', '사회봉사'] as const;

export const PERIOD_STATUS = {
  fill: 'FILL',
  empty: 'EMPTY',
} as const;
