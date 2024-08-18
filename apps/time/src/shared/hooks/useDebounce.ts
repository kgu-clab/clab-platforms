import { useEffect, useState } from 'react';

interface UseDebounceParams<T> {
  value: T;
  delay: number;
}

export default function useDebounce<T>({ value, delay }: UseDebounceParams<T>) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const delayDebounceTimer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(delayDebounceTimer);
  }, [value, delay]);

  return debouncedValue;
}
