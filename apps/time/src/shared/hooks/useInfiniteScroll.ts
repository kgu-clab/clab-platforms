'use client';

import { useCallback, useEffect, useRef } from 'react';

export default function useInfiniteScroll(callback: () => void) {
  const targetRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    ([target]: IntersectionObserverEntry[]) => {
      if (target.isIntersecting) {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect(); // 기존 옵저버 해제
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [handleIntersection]);

  return targetRef;
}
