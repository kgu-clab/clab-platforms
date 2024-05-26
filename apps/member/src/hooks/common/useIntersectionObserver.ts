import { useCallback, useEffect, useRef } from 'react';

interface UseIntersectionObserver {
  fetchNextPage: () => void;
}

export function useIntersectionObserver({
  fetchNextPage,
}: UseIntersectionObserver) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchNextPage();
      }
    },
    [fetchNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  return { targetRef } as const;
}
