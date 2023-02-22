interface Dates {
  start: Date;
  end: Date;
}

export const getDiffInMonths = ({ start, end }: Dates): number => {
  if (!start || !end) {
    return 0;
  }
  const diffInMilliseconds: number =
    new Date(end).getTime() - new Date(start).getTime();
  const diffInDays: number = diffInMilliseconds / 86400000;
  return Math.floor(diffInDays / 30);
};
