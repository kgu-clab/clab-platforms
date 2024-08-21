interface GetFormatterTimeParameter {
  hour: number;
  minute: number;
}

export function getFormattedTime({ hour, minute }: GetFormatterTimeParameter) {
  const formattedHour = hour < 10 ? `0${hour}` : hour.toString();
  const formattedMinute = minute < 10 ? `0${minute}` : minute.toString();

  return `${formattedHour}:${formattedMinute}`;
}
