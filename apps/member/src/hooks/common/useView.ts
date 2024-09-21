import { useCallback, useState } from 'react';

/**
 * 렌더링할 뷰를 관리합니다.
 */
export function useView<TView>(initialData: TView) {
  const [view, setView] = useState<TView>(initialData);

  const handleViewClick = useCallback((view: TView) => setView(view), []);

  return { view, setView, handleViewClick } as const;
}
