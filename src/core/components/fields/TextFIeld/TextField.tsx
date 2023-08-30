import { ChangeEventHandler, FocusEvent, FocusEventHandler, ReactElement, useState } from 'react';
import InputMask, { Props } from 'react-input-mask';
import cn from 'classnames';

import { FieldHint } from 'core/components';
import { CoreHandler, Parsers } from 'core/models';
import { parseValue } from 'core/utils';

export interface TextFieldProps extends Omit<Props, 'onChange' | 'onBlur' | 'onFocus'> {
  name: string;
  error?: string;
  hint?: string;
  label?: string | ReactElement;
  isUseBothHints?: boolean;
  contentLeft?: string | ReactElement;
  contentRight?: string | ReactElement;
  parsers?: Parsers;
  classes?: Partial<
    Record<'root' | 'label' | 'input' | 'hint' | 'contentLeft' | 'contentRight', string>
  >;
  onChange: CoreHandler;
  onFocus?: CoreHandler<FocusEvent<HTMLInputElement>>;
  onBlur?: CoreHandler<FocusEvent<HTMLInputElement>>;
}

export const TextField = (props: TextFieldProps) => {
  const {
    parsers,
    label,
    name,
    error,
    hint,
    classes = {},
    value = '',
    contentLeft,
    contentRight,
    mask = '',
    isUseBothHints,
    onChange,
    onBlur,
    onFocus,
    ...rest
  } = props;

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const isEmpty = !!`${props.value}`.length || isFocus;

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    onBlur?.(name, e.target.value, e);
    setIsFocus(false);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    onFocus?.(name, e.target.value, e);
    setIsFocus(true);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const returnValue = parsers ? parseValue(value, parsers) : value;
    onChange(name, returnValue, e);
  };

  const isShowHint = !!error || !!hint;

  return (
    <div
      className={cn(
        'field input-text',
        { 'input-text__invalid': !!error },
        { 'input-text__active': isFocus },
        { 'input-text__no-empty': isEmpty },
        { 'input-text__disabled': props.disabled },
        classes.root,
      )}
    >
      <div className={cn('input-text__wrapper')}>
        {label && (
          <label className={cn('input-text__label', classes.label)} htmlFor={name}>
            {label}
          </label>
        )}

        {contentLeft && (
          <div className={cn('input-text__content-left', classes.contentLeft)}>{contentLeft}</div>
        )}

        <InputMask
          name={name}
          mask={mask}
          value={value}
          className={cn(classes.input)}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...rest}
        />

        {contentRight && (
          <div className={cn('input-text__content-right', classes.contentRight)}>
            {contentRight}
          </div>
        )}
      </div>

      {isShowHint && (
        <FieldHint
          className={classes.hint}
          hint={hint}
          error={error}
          isUseBothHints={isUseBothHints}
        />
      )}
    </div>
  );
};
