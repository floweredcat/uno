import { getDiffInMonths } from "./getDiffDates.ts";

interface Dates {
  start: Date;
  end: Date;
}

export const getLeftTime = ({ start, end }: Dates): { months: string; leftDays: string } => {
  if (!start || !end) {
    return {
      months: "0 Месяцев",
      leftDays: "0 Дней",
    };
  }
  const diffInDays = getDiffInMonths({ start, end }) * 30;
  const months = diffInDays / 30;
  const leftDays = diffInDays - Math.floor(months) * 30;
  const leftDaysText =
    leftDays === 1
      ? `${leftDays} День`
      : leftDays >= 2 && leftDays <= 4
      ? `${leftDays} Дня`
      : `${leftDays} Дней`;
  const monthsText =
    months === 0
      ? "Пакет не активен"
      : months === 1
      ? `${Math.floor(months)} Месяц`
      : months >= 2 && months <= 4
      ? `${Math.floor(months)} Месяца`
      : `${Math.floor(months)} Месяцев`;
  return {
    months: monthsText,
    leftDays: leftDaysText,
  };
};