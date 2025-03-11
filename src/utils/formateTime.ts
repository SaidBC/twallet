const HOUR_TIMESTAMP = 1000 * 60 * 60;
const DAY_TIMESTAMP = 1000 * 60 * 60 * 24;
const MINUTES_TIMESTAMP = 1000 * 60;
const SECONDS_TIMESTAMP = 1000;

export default function formateTime(timestamp: number) {
  if (timestamp > DAY_TIMESTAMP || timestamp < 0) return "00:00:00";
  const hours = Math.floor(timestamp / HOUR_TIMESTAMP);
  const minutes = Math.floor(
    (timestamp - hours * HOUR_TIMESTAMP) / MINUTES_TIMESTAMP
  );
  const seconds = Math.floor(
    (timestamp - hours * HOUR_TIMESTAMP - minutes * MINUTES_TIMESTAMP) /
      SECONDS_TIMESTAMP
  );
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
}
