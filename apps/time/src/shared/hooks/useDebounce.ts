import { useEffect, useState } from 'react';

interface UseDebounceParams {
  value: unknown;
  delay: number;
}

export default function useDebounce({ value, delay }: UseDebounceParams) {
  const [debouncedValue, setDebouncedValue] = useState<unknown>(value);

  useEffect(() => {
    const delayDebounceTimer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(delayDebounceTimer);
  }, [value, delay]);

  return debouncedValue;
}
