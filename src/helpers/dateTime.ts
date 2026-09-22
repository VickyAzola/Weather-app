const formatDate = (dateValue: Date | string | number) => {
  const date = new Date(dateValue);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
};

const formatHour = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
    timeZone: "UTC",
  }).format(date);

const formatDay = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "UTC",
  }).format(date);

const formatDayLong = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "UTC",
  }).format(date);

const getDayKey = (date: Date) => date.toISOString().slice(0, 10);

export { formatDate, formatHour, formatDay, formatDayLong, getDayKey };
