export function getStyleByLeftMonths(diffDates) {
  let result = "red";
  if (diffDates === 0) {
    result = "red";
  }
  if (diffDates < 1 && diffDates > 0) {
    result = "yellow";
  }
  if (diffDates > 1) {
    result = "green";
  }
  return result;
}
