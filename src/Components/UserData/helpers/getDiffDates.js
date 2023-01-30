export const getDiffDates = ({start, end}) => {
  if (!start || !end) {
    return 0
  }
    const diff =
      new Date(end) -
      new Date(start);
    const days = diff / 86400000;
    let months = Math.floor(days / 30);
    return months;
  };