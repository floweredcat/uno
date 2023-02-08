import { getDiffDates } from "./getDiffDates";

export const getLeftMonth = ({ start, end }) => {
  if (!start || !end) {
    return {
      months: 0,
      leftDays: 0,
    };
  }
  const diff = getDiffDates({ start, end });

  const days = diff / 86400000;
  let months = Math.floor(days / 30);
  let leftDays = Math.floor(days / 30 - months);
  if (leftDays[-1] === 1) {
    leftDays += " День";
  } else if (2 <= leftDays[-1] <= 4) {
    leftDays += " Дня";
  } else {
    leftDays += " Дней";
  }
  if (months === 0) {
    months = "Пакет не активен";
  } else if (months === 1) {
    months += " Месяц";
  } else if (2 <= months && months <= 4) {
    months += " Месяца";
  } else {
    months += " Месяцев";
  }
  return { months, leftDays };
};
