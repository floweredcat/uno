export const formatDate = (date) => {
  const month = date.getMonth() + 1;
  return date.getFullYear() + "-" + month + "-" + date.getDate();
};
