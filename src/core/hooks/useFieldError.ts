import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type GetFieldError = (error?: string) => string;

type UseFieldError = () => GetFieldError;

export const useFieldError: UseFieldError = () => {
  const { t } = useTranslation();

  const tryParse = (error: string) => {
    try {
      return JSON.parse(error);
    } catch (e) {
      return error;
    }
  };

  return useCallback<GetFieldError>((error) => {
    if (!error) return '';
    const parsedError = tryParse(error);

    if (typeof parsedError === 'string') return t(parsedError);
    const { data, message }: any = parsedError;
    return t(message, data) as string;
  }, []);
};
