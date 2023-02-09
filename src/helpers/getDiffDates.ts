interface Dates {
  start: Date;
  end: Date;
}

export const getDiffDates = ({ start, end }: Dates) => {
  if (!start || !end) {
    return 0;
  }
  const diff: number = new Date(end).getTime() - new Date(start).getTime();
  const days: number = diff / 86400000;
  let months: number = Math.floor(days / 30);
  return months;
};
