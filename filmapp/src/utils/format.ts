export const formatPrice = (price: number): string => {
  return price.toLocaleString('en-US');
};

export const formatDateTime = (dateTimeStr: string): string => {
  const [datePart, timePart] = dateTimeStr.split(' ');
  const [day, month, year] = datePart.split('/');
  const [hour, minute] = timePart.split(':');

  return `${hour}:${minute} ${day}/${month}/${year}`;
};