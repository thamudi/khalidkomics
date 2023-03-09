export const formatDate = (date: string) => {
  const newDate = new Date(date);
  const [day, month, year] = [
    newDate.getDay(),
    newDate.toLocaleString('en-US', { month: 'short' }),
    newDate.getFullYear(),
  ];
  return `${month} ${day},${year}`;
};
