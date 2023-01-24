export const getDiffDates = ({start, end}) => {
  if (!start || !end) {
    return 0
  }
    const diff =
      new Date(new Date(end.substr(0, end.indexOf("T")))) -
      new Date(start.substr(0, start.indexOf("T")));
    const days = diff / 86400000;
    let months = Math.floor(days / 30);
    return months;
  };