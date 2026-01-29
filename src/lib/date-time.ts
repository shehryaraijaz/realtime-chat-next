export const format = (timestamp: number) => {
  const date = new Date(timestamp);

  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");

  const timeString = `${hh}:${mm}`;

  return timeString;
};
