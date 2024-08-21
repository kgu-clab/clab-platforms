interface GetFormattedDateParams {
  hour: number;
  minute: number;
}

export default function getFormattedDate({
  hour,
  minute,
}: GetFormattedDateParams) {
  const date = new Date();

  if (hour > 24 || hour < 0) {
    throw new Error('유효하지 않은 hour 범위입니다.');
  }

  if (minute > 60 || minute < 0) {
    throw new Error('유효하지 않은 minute 범위입니다.');
  }

  date.setHours(hour, minute, 0, 0);

  return date;
}
