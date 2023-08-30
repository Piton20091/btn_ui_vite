import { ChangeEventHandler, FC, InputHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import { CoreHandler } from 'core/models';

export interface RadioOption {
  label: string | ReactNode | FC<{ checked: boolean }>;
  value: string | number;
}

export interface InputRadioOptionProps
  extends Omit<Partial<InputHTMLAttributes<HTMLInputElement>>, 'onChange' | 'type'> {
  option: RadioOption;
  name: string;
  onChange: CoreHandler;
  classes: Partial<Record<'option' | 'label', string>>;
}

export const InputRadioOption = (props: InputRadioOptionProps) => {
  const { option, name, value, onChange, classes, ...rest } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(name, e.target.value, e);
  };

  const checked = option.value === value;

  return (
    <div
      key={option.value}
      className={cn('input-radio__option', checked && 'input-radio__option_checked')}
    >
      <input
        name={name}
        type='radio'
        id={`${name}-${option.value}`}
        value={option.value}
        checked={checked}
        onChange={handleChange}
        {...rest}
      />
      <label
        className={cn('input-radio__option-label', classes.label)}
        htmlFor={`${name}-${option.value}`}
      >
        {typeof option.label === 'function' ? option.label({ checked }) : option.label}
      </label>
    </div>
  );
};
