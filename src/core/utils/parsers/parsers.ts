import { format, parse } from 'date-fns';

import { SETTINGS } from 'core/settings';

export const onlyNumbers = (value: string): string => value.replace(/[^0-9]/g, '');
export const trim = (value: string) => value.trim();

export const onlyUpperCase = (v: string): string => v.toUpperCase();
export const onlyLowerCase = (v: string): string => v.toLowerCase();
export const maxLength =
  (l: number) =>
  (v: string): string =>
    v.slice(0, l);

export const capitalizeFirstLetter = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

export const normalizeNumberFormat = (v: string) => {
  const value = new Intl.NumberFormat('ru-RU').format(+onlyNumbers(v));
  return value === '0' ? '' : value;
};

export const formatNumber = (value: string | number) =>
  value === '0' || value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

export const parseDate = (v: string) => parse(v, SETTINGS.dateFormat, new Date());
export const formatDate = (v: Date) => format(v, SETTINGS.dateFormat);
