export function getMinDate(date: [Date]): Date {
  let minDate = new Date();

  date?.forEach((el) => {
    if (new Date(el) < minDate) {
      minDate = new Date(el);
    }
  });

  return minDate;
}
