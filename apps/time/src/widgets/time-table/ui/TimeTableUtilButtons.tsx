'use client';

import { useRef, useState } from 'react';

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

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setIsCopy(false);
        timeoutRef.current = null;
      }, 2000);
    } catch (error) {
      alert(`Failed to copy: ${error}`);
    }
  };

  return (
    <button
      className="rounded-md border border-gray-400 bg-gray-50 p-3 transition-colors hover:bg-gray-100"
      type="button"
      onClick={handleCopyButton}
    >
      {!isCopy ? (
        <ClipboardDocumentSolid
          className="fill-gray-800"
          width={24}
          height={24}
        />
      ) : (
        <ClipboardDocumentCheckSolid
          className="fill-green-600"
          width={24}
          height={24}
        />
      )}
    </button>
  );
}

export default function TimeTableUtilButtons() {
  return (
    <div className="flex items-center justify-between">
      <TimeTableCopyButton />
    </div>
  );
}
