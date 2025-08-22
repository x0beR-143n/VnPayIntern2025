import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const formatDateTime = (dateTimeStr: string): string => {
  return dayjs(dateTimeStr, 'DD/MM/YYYY HH:mm:ss').format('HH:mm DD/MM/YYYY');
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString('en-US');
};

export const formatDateTimeNoHour = (dateTimeStr: string): string => {
  return dayjs(dateTimeStr, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY');
};
