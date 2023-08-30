import { FocusEvent } from 'react';
import { useController } from 'react-hook-form';

import { InputTextProps, InputText } from './InputText.tsx';
import { CoreHandler, UseControllerCoreProps } from 'core/models';
import { useFieldError } from 'core/hooks';

type InputTextHookFormProps = Omit<InputTextProps, 'value'> & UseControllerCoreProps;

export const InputTextHookForm = (props: InputTextHookFormProps) => {
  const { name, control, rules, onChange, onBlur, ...rest } = props;

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

  const handleChange: CoreHandler = (name, value, e) => {
    field.onChange(value);
    onChange?.(name, value, e);
  };

  const handleBlur: CoreHandler<FocusEvent<HTMLInputElement>> = (name, value, e) => {
    field.onBlur();
    onBlur?.(name, value, e);
  };

  return (
    <InputText
      name={name}
      onChange={handleChange}
      value={field.value}
      onBlur={handleBlur}
      error={getFieldError(error?.message)}
      {...rest}
    />
  );
};
