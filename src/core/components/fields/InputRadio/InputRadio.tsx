import { ReactNode } from 'react';
import cn from 'classnames';

import { FieldHint } from 'core/components';
import { InputRadioOption, InputRadioOptionProps, RadioOption } from './InputRadioOption';

export interface InputRadioProps extends Omit<InputRadioOptionProps, 'option' | 'classes'> {
  options: RadioOption[];
  label?: ReactNode | string;
  error?: string;
  classes?: Partial<Record<'root' | 'label' | 'error' | 'option' | 'labelOption', string>>;
}

export const InputRadio = (props: InputRadioProps) => {
  const { label, options, classes = {}, error, ...rest } = props;

  return (
    <div
      className={cn(
        'input-radio',
        { 'input-radio__invalid': error },
        { 'input-radio__disabled': props.disabled },
        classes.root,
      )}
    >
      {label && <div className={cn('input-radio__label', classes.label)}>{label}</div>}
      <div className='input-radio__options'>
        {options.map((option) => (
          <InputRadioOption
            key={option.value}
            option={option}
            classes={{ option: classes.option, label: classes.labelOption }}
            {...rest}
          />
        ))}
      </div>
      {error && <FieldHint className={classes.error} error={error} />}
    </div>
  );
};
