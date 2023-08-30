import cn from 'classnames';

interface HintProps {
  className?: string;
  message?: string;
  isError?: boolean;
}

export const Hint = (props: HintProps) => {
  const { className, message = '', isError = false } = props;

  return message ? (
    <span className={cn(`field-hint${isError ? '__error' : ''}`, className)}>{message}</span>
  ) : null;
};
