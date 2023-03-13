export function getMaxDate(date: [Date]): Date {
  let maxDate = new Date();

  date?.forEach((el) => {
    if (new Date(el) > maxDate) {
      maxDate = new Date(el);
    }
  });

  return maxDate;
}
