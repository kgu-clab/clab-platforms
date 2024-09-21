import { type ReactNode, useMemo } from 'react';

import { UseModalResult, useModal } from '@hooks/common/useModal';

interface Options {
  title: string;
  content: ReactNode;
  onClick: () => void;
}

/**
 * 멤버 정보 모달을 엽니다.
 */
export function useActivityGroupConfirmModal(): UseModalResult<Options> {
  const { open } = useModal();

  return useMemo(
    () => ({
      open: ({ title, content, onClick }: Options) =>
        open({
          title: title,
          content: content,
          accept: {
            text: '확인',
            onClick: onClick,
          },
        }),
    }),
    [open],
  );
}
