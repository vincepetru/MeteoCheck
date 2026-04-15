export function formatTemperature(celsius) {
  return `${Math.round(celsius)}°C`;
}

export function formatDateTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('it-IT', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
