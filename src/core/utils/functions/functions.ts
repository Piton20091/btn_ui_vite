import { ParseValueHandler, TimerValueReturned } from 'core/models';

export const fakeRange = (length: number, start = 0): number[] =>
  Array.from({ length }, (_, i) => i + start);

export const parseValue: ParseValueHandler = (v, parsers) => {
  return parsers.reduce((acc: string, cur: (v: string) => string): string => cur(acc), v);
};

export const replaceCharacter = (string: string, index: number, replacement: string) => {
  return string.slice(0, index) + replacement + string.slice(index + replacement.length);
};

const setZero = (num: number) => (num < 10 ? `0${num}` : num.toString());

export const parseTimeForTimer = (time: number, separator = ':'): TimerValueReturned => {
  const hours = Math.trunc(time / 3600);
  const min = Math.trunc((time - hours * 3600) / 60);
  const sec = time % 60;

  const fullString = [hours, min, sec].reduce((acc, cur) => {
    const sep = acc.length ? separator : '';
    return acc.concat(cur < 10 ? `${sep}0${cur}` : `${sep}${cur}`);
  }, '');

  return {
    fullString,
    secondString: setZero(sec),
    minutesString: setZero(min),
    hoursString: setZero(hours),
    secondsNumber: time,
  };
};
