import { useMemo } from 'react';

import { useModal } from '@hooks/common/useModal';

interface Options {
  title: string;
  onClick: () => void;
}

/**
 * 삭제 모달을 엽니다.
 */
export function useDeleteModal() {
  const { open } = useModal();

  return useMemo(
    () => ({
      open: (options: Options) =>
        open({
          title: `${options.title} 삭제`,
          content: `해당 ${options.title}을 정말 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.`,
          accept: {
            text: '삭제',
            onClick: options.onClick,
          },
        }),
    }),
    [open],
  );
}
