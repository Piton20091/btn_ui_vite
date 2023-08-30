import { Hint } from './Hint';

interface FieldHintProps {
  className?: string;
  hint?: string;
  error?: string;
  isUseBothHints?: boolean;
}

export const FieldHint = (props: FieldHintProps) => {
  const { className, hint, error, isUseBothHints = false } = props;

  return isUseBothHints ? (
    hint || error ? (
      <div className='field-hint__wrapper'>
        <Hint className={className} message={hint} />;
        <Hint className={className} message={error} isError={!!error} />;
      </div>
    ) : null
  ) : (
    <Hint className={className} message={error || hint} isError={!!error} />
  );
};
