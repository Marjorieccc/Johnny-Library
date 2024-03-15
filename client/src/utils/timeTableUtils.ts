export const combineDateAndTime = (date: Date, time: Date) => {
  const combinedDate = new Date(date.getTime());
  combinedDate.setHours(time.getHours(), time.getMinutes(), 0);
  return combinedDate;
}

export const formatNumber = (num: number) => {
  return ("0" + num).slice(-2);
}

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    weekday: 'short',
    day: 'numeric'
  });
};

export const formatTime = (time: Date) => {
  return formatNumber(time.getHours()) + ":" + formatNumber(time.getMinutes());
}