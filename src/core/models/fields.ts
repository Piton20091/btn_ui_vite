import { UseControllerProps } from 'react-hook-form';

export type Parsers = Array<(value: string) => string>;
export type ParseValueHandler = (v: string, parsers: Parsers) => string;

export type UseControllerCoreProps = Pick<UseControllerProps, 'control' | 'rules'>;

export enum PinFieldActions {
  Delete = 'Delete',
  Backspace = 'Backspace',
  ArrowRight = 'ArrowRight',
  ArrowLeft = 'ArrowLeft',
  Paste = 'Paste',
  Focus = 'Focus',
  Change = 'Change',
  Mount = 'Mount',
}
