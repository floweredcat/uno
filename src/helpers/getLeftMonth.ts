import { dateDiff } from "./getDiffDates.js";

interface Dates {
  start: Date;
  end: Date;
}

export const getLeftTime = ({
  start,
  end,
}: Dates): { months: string; leftDays: string } => {
  if (!start || !end) {
    return {
      months: "0 Месяцев",
      leftDays: "0 Дней",
    };
  }
  const { months, days } = dateDiff({ start, end });
  const leftDaysText =
    days === 1
      ? `${days} День`
      : days >= 2 && days <= 4
      ? `${days} Дня`
      : `${days} Дней`;
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
