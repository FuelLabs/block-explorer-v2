import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { TAI64 } from 'tai64';

dayjs.extend(relativeTime);

type DateDifference = {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
};

export const dateDiff = (date1: Date, date2: Date): DateDifference => {
  const seconds = Math.floor(Math.abs(date1.getTime() - date2.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // hours = hours - (days * 24);
  // minutes = minutes - (days * 24 * 60) - (hours * 60);
  // seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

  return { seconds, minutes, hours, days };
};

export const dateDiffRelative = (date1: Date, date2: Date): DateDifference => {
  let seconds = Math.floor(Math.abs(date1.getTime() - date2.getTime()) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  hours -= days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  return { seconds, minutes, hours, days };
};

export const getTextForRelativeTimeDifference = (dateDiff: DateDifference) => {
  const text: string[] = [];

  if (dateDiff.days > 0) text.push(`${dateDiff.days} days`);
  if (dateDiff.hours > 0) text.push(`${dateDiff.hours} hrs`);
  if (dateDiff.minutes > 0) text.push(`${dateDiff.minutes} min`);
  if (dateDiff.seconds > 0) text.push(`${dateDiff.seconds} sec`);

  return `${text.slice(0, 2).join(' ')} ago`;
};

export const getTextForTimeDifference = (dateDiff: DateDifference) => {
  if (dateDiff.days > 0) return `${dateDiff.days} days ago`;
  if (dateDiff.hours > 0) return `${dateDiff.hours} hours ago`;
  if (dateDiff.minutes > 0) return `${dateDiff.minutes} minutes ago`;
  if (dateDiff.seconds > 0) return `${dateDiff.seconds} seconds ago`;

  return '';
};

export const tai64toDayjs = (tai64Timestamp: string) => {
  const timestamp = TAI64.fromString(tai64Timestamp, 10).toUnix();
  return dayjs(timestamp * 1000);
};

export const tai64toDate = (tai64Timestamp: string) => tai64toDayjs(tai64Timestamp).toDate();

export const formatDate = (tai64Timestamp: string) => tai64toDayjs(tai64Timestamp).fromNow();

export const dateToTai64 = (date: Date) =>
  TAI64.fromUnix(Math.floor(date.getTime() / 1000)).toString(10);
