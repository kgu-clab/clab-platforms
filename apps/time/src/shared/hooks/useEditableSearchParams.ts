'use client';

import { useSearchParams } from 'next/navigation';

function useEditableSearchParams() {
  const currentSearchParams = useSearchParams();
  const searchParams = new URLSearchParams(currentSearchParams.toString());

  return searchParams;
}

export default useEditableSearchParams;
