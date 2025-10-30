'use client';

import { useEffect, useRef, useState } from 'react';

import {
  ClipboardDocumentCheckSolid,
  ClipboardDocumentSolid,
} from '@clab-platforms/icon';

function TimeTableCopyButton() {
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  const handleCopyButton = async () => {
    try {
      const url = window.location.href;

      await navigator.clipboard.writeText(url);
      setIsCopy(true);

      timeoutRef.current = window.setTimeout(() => {
        setIsCopy(false);
        timeoutRef.current = null;
      }, 6000);
    } catch (error) {
      alert(`Failed to copy: ${error}`);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex w-full justify-end">
      <button
        className="rounded-full border border-gray-400 bg-gray-50 px-4 py-2 font-light transition-colors hover:bg-gray-100"
        type="button"
        onClick={handleCopyButton}
      >
        {!isCopy ? (
          <div className="flex items-center gap-2">
            <ClipboardDocumentSolid
              className="fill-gray-800"
              width={16}
              height={16}
            />
            <p>시간표 링크 복사</p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <ClipboardDocumentCheckSolid
              className="fill-green-600"
              width={16}
              height={16}
            />
            <p className="text-green-600">
              복사 완료! 링크를 전송해 친구와 공유해보세요
            </p>
          </div>
        )}
      </button>
    </div>
  );
}

export default function TimeTableUtilButtons() {
  return (
    <div className="flex items-center justify-between">
      <TimeTableCopyButton />
    </div>
  );
}
