import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useController } from 'react-hook-form';

import { FieldHint } from 'core/components';
import { fakeRange, parseValue, replaceCharacter, maxLength } from 'core/utils';
import { useFieldError } from 'core/hooks';
import { Parsers, InputPinActions, UseControllerCoreProps } from 'core/models';

import { InputPinItem } from './InputPinItem';

interface InputPinProps extends UseControllerCoreProps {
  length: number;
  name: string;
  parsers?: Parsers;
  label?: string;
  autoValue?: string;
  classes?: Partial<Record<'root' | 'label' | 'wrapper' | 'item', string>>;
}

export const InputPin = (props: InputPinProps) => {
  const { autoValue, classes = {}, length, label, control, rules, name, parsers = [] } = props;

  const getFieldError = useFieldError();
  const [selectIdx, setSelectIdx] = useState<null | number>(null);

  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: ' '.repeat(length),
  });

  useEffect(() => {
    autoValue && handleChange(InputPinActions.Paste, autoValue.length - 1, autoValue);
  }, [autoValue]);

  const errorMessage = getFieldError(error?.message);

  const pinFieldReducer = (key: string, idx: number, val = '') => {
    const extendParsers = [maxLength(1), ...parsers];

    switch (key) {
      case InputPinActions.Delete:
      case InputPinActions.Backspace: {
        const index = idx === 0 ? 0 : idx - 1;
        return { value: replaceCharacter(value, idx, ' '), idx: index };
      }

      case InputPinActions.ArrowLeft: {
        const index = idx === 0 ? 0 : idx - 1;
        return { value, idx: index };
      }

      case InputPinActions.ArrowRight: {
        const index = value.length;
        return { value, idx: index === idx ? index : idx + 1 };
      }

      case InputPinActions.Paste:
        return { value: parseValue(val, parsers).slice(0, length), idx };

      case InputPinActions.Focus:
        return { value, idx };

      default: {
        const index = value.length;

        const v = parseValue(key, extendParsers);

        return {
          value: replaceCharacter(value, idx, v),
          idx: index === idx ? index : v ? idx + 1 : idx,
        };
      }
    }
  };

  const handleChange = (key: string, idx: number, val?: string) => {
    const data = pinFieldReducer(key, idx, val);
    onChange(data.value || '');
    setSelectIdx(data.idx);
  };

  return (
    <div className={cn('input-pin', { 'input-pin__error': errorMessage }, classes.root)}>
      {label && <label className={cn('input-pin__label', classes.label)}>{label}</label>}
      <div className={cn('input-pin__wrapper', classes.wrapper)}>
        {fakeRange(length).map((item, idx) => (
          <InputPinItem
            idx={idx}
            selectIdx={selectIdx}
            key={item}
            value={value[item] || ''}
            onChange={handleChange}
            onBlur={onBlur}
            name={name}
            className={classes.item}
          />
        ))}
      </div>
      {errorMessage && <FieldHint error={errorMessage} />}
    </div>
  );
};
