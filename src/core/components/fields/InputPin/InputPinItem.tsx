import {
  ChangeEventHandler,
  ClipboardEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { IGNORED_META_KEYS } from 'core/constants';
import { InputPinActions } from 'core/models';
import { trim } from 'core/utils';

interface InputPinItemProps extends Omit<ControllerRenderProps, 'onChange' | 'ref'> {
  idx: number;
  selectIdx: number | null;
  onChange: (key: string, idx: number, value?: string) => void;
  className?: string;
}

export const InputPinItem = (props: InputPinItemProps) => {
  const { className, idx, selectIdx, value, name, onChange, onBlur, ...rest } = props;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    selectIdx === idx && ref.current?.focus();
  }, [selectIdx]);

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const key = e.nativeEvent.key;

    if (
      !IGNORED_META_KEYS.includes(key) &&
      !e.ctrlKey &&
      !e.altKey &&
      !e.metaKey &&
      e.nativeEvent.target instanceof HTMLInputElement
    ) {
      e.preventDefault();
      onChange(key, idx);
    }
  };

  const onFocus = () => onChange(InputPinActions.Focus, idx);

  const onPaste: ClipboardEventHandler<HTMLInputElement> = (e) => {
    const value = e.clipboardData.getData('Text');
    onChange(InputPinActions.Paste, idx, value);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = () => null;

  return (
    <input
      ref={ref}
      name={name}
      type='text'
      autoComplete='off'
      placeholder='X'
      value={trim(value)}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onFocus={onFocus}
      onPaste={onPaste}
      onChange={handleChange}
      className={className}
      {...rest}
    />
  );
};
