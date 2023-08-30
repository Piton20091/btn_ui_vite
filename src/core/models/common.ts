import { ChangeEvent, SyntheticEvent } from 'react';

export type CoreHandler<Event extends SyntheticEvent = ChangeEvent<HTMLInputElement>> = (
  name: string,
  value: string,
  e: Event,
) => void;

export interface TimerValueReturned {
  fullString: string;
  hoursString: string;
  secondString: string;
  minutesString: string;
  secondsNumber: number;
}
