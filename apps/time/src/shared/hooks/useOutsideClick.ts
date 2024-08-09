import { useEffect, useRef } from 'react';

interface UseOutsideClickParams {
  callback: () => void;
}

export default function useOutsideClick({ callback }: UseOutsideClickParams) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(e.target as Node)) {
        callback();
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [targetRef, callback]);

  return targetRef;
}
