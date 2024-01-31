export const monthDate = (year: number, month: number) => {
  if (month === 2) return year % 4 === 0 || year % 400 === 0 ? 29 : 28;
  else if (month < 8) return month % 2 !== 0 ? 31 : 30;
  else return month % 2 === 0 ? 31 : 30;
};

export const checkDate = (year: number, month: number) => {
  let checkedMonth = month;
  let checkedYear = year;
  switch (month) {
    case 1:
      checkedMonth = 1;
      checkedYear--;
      break;
    case 12:
      checkedMonth = 1;
      checkedYear++;
      break;
    default:
      checkedMonth--;
  }
  return { checkedYear, checkedMonth };
};
