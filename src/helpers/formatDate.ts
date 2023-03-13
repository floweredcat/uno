export function formatDate(date: Date): string {
  if (!date) {
    return "0";
  }

  let dd = date.getDate().toString();
  if (Number(dd) < 10) dd = "0" + dd;

  let mm = (date.getMonth() + 1).toString();
  if (Number(mm) < 10) mm = "0" + mm;

  let yy = (date.getFullYear() % 100).toString();
  if (Number(yy) < 10) yy = "0" + yy;

  return dd + "." + mm + "." + yy;
}
