
import { useState, useCallback } from 'react';

export function useFormInput<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  const handleChange = useCallback((newValue: T) => {
    setValue(newValue);
  }, []);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    onChange: handleChange,
    setValue,
    reset
  };
}
