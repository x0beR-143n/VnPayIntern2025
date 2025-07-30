const getVietnameseDay = () => {
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const today = new Date();
  return days[today.getDay()];
};

const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};

const convertMinuteToHour = (mins:number) => {
  const hours = Math.floor(mins / 60);
  const remainingMinutes = mins % 60;

  return `${hours} giờ ${remainingMinutes} phút`;
}

const formatCurrencyVND = (amount: number) => {
  return amount.toLocaleString('en-US') + 'đ';
}

export { getVietnameseDay, getTodayDate, convertMinuteToHour, formatCurrencyVND };