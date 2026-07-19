const formatDate = (dateValue: Date | string | number) => {
  const date = new Date(dateValue);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const formatHour = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
  }).format(date);

const formatDay = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(date);

const formatDayLong = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);

const getDayKey = (date: Date) => date.toISOString().slice(0, 10);

export { formatDate, formatHour, formatDay, formatDayLong, getDayKey };
