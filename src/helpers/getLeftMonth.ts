import { getDiffDates } from "./getDiffDates.ts";

interface Dates {
  start: Date;
  end: Date;
}

export const getLeftMonth = ({ start, end }: Dates) => {
  if (!start || !end) {
    return {
      months: 0,
      leftDays: 0,
    };
  }
  const diff: number = getDiffDates({ start, end });
  let months: string = "";

  const days = diff / 86400000;
  let month = Math.floor(days / 30);
  let leftDays: any = Math.floor(days / 30 - month);
  if (leftDays[-1] === 1) {
    leftDays += " День";
  } else if (2 <= leftDays[-1] && leftDays[-1] <= 4) {
    leftDays += " Дня";
  } else {
    leftDays += " Дней";
  }
  if (month === 0) {
    months = "Пакет не активен";
  } else if (month === 1) {
    months += " Месяц";
  } else if (2 <= month && month <= 4) {
    months += " Месяца";
  } else {
    months += " Месяцев";
  }
  return { months, leftDays };
};
