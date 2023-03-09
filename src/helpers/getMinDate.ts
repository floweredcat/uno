export function getMinDate(date: [Date]): Date {
  let maxDate = new Date(2100, 0, 1);

  date?.forEach((el) => {
    if (new Date(el) < maxDate) {
      maxDate = new Date(el);
    }
  });

  return maxDate;
}
