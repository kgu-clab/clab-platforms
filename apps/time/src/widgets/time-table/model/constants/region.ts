export const REGION = {
  campus1: '수원',
  campus2: '서울',
} as const;

export const DAY_STATUS = {
  day: '주간',
  night: '야간',
} as const;

export const CAMPUS_STATUS = {
  day: [
    `${REGION.campus1}${DAY_STATUS.day}`,
    `${REGION.campus2}${DAY_STATUS.day}`,
  ],
  night: [
    `${REGION.campus1}${DAY_STATUS.night}`,
    `${REGION.campus2}${DAY_STATUS.night}`,
  ],
} as const;

export const REGION_VALUE_ARRAY = Object.values(REGION);
