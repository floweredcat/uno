export function dateDiff({ start, end }) {
  const diff = Math.floor((end - start) / (1000 * 60 * 60 * 24));

  const years = Math.floor(diff / 365);
  const months = Math.floor((diff % 365) / 30);
  const days = diff - years * 365 - months * 30;

  return { years, months, days };
}
