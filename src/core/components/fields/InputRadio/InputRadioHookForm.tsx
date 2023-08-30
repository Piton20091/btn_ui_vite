import { useCallback } from 'react';
import { useController } from 'react-hook-form';

import { InputRadio, InputRadioProps } from './InputRadio';
import { CoreHandler, UseControllerCoreProps } from 'core/models';
import { useFieldError } from 'core/hooks';

type InputRadioHookFormProps = Omit<InputRadioProps, 'value'> & UseControllerCoreProps;

export const InputRadioHookForm = (props: InputRadioHookFormProps) => {
  const { name, control, rules, onChange, ...rest } = props;

  const getFieldError = useFieldError();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: '',
  });

  const handleChange: CoreHandler = useCallback((name, value, e) => {
    field.onChange(value);
    onChange?.(name, value, e);
  }, []);

  return (
    <InputRadio
      name={name}
      error={getFieldError(error?.message)}
      value={field.value}
      onChange={handleChange}
      {...rest}
    />
  );
};
