'use client';

import { useState } from 'react';

import { SUGANG_PAGE, SUGANG_PAGE_MODE } from '../constants';

export function useContentByPage() {
  const [selected, setSelected] = useState(0);
  const page = Object.values(SUGANG_PAGE)[selected];
  const mode =
    SUGANG_PAGE_MODE[
      Object.keys(SUGANG_PAGE)[selected] as keyof typeof SUGANG_PAGE_MODE
    ];
  return { selected, setSelected, page, mode };
}
