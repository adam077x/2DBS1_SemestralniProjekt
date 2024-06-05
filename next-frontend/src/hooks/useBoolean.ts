import { useState, useCallback } from 'react';

type UseBooleanReturn = [boolean, { on: () => void; off: () => void; toggle: () => void }];

export const useBoolean = (initialValue: boolean = false): UseBooleanReturn => {
  const [value, setValue] = useState(initialValue);

  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((v) => !v), []);

  return [value, { on, off, toggle }];
};
