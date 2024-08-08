'use client';

import { useSearchParams } from 'next/navigation';

function useClientSearchParams() {
  const currentSearchParams = useSearchParams();
  const searchParams = new URLSearchParams(currentSearchParams);

  return searchParams;
}

export default useClientSearchParams;
