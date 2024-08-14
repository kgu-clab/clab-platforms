import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { Button } from '@clab-platforms/design-system';
import {
  FileEarmarkArrowUpOutline,
  FileEarmarkDiffOutline,
} from '@clab-platforms/icon';

type Accept = 'image/*';

interface UploaderProps {
  accept: Accept;
  onFileAccepted: (file?: File) => void;
  isSuccess?: boolean;
  label?: string;
  maxFiles?: number;
  multiple?: boolean;
}

interface FileWithPreview extends File {
  preview: string;
}

const Uploader = ({
  accept,
  isSuccess = false,
  label,
  maxFiles = 1,
  multiple = false,
  onFileAccepted,
}: UploaderProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  /**
   * 파일이 인식되었을 때 실행되는 콜백 함수입니다.
   */
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onFileAccepted(file);
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
        );
      }
    },
    [onFileAccepted],
  );
  /**
   * 파일 선택 취소 시 실행되는 콜백 함수입니다.
   */
  const onFileDialogCancel = useCallback(() => {
    onFileAccepted();
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, inputRef } =
    useDropzone({
      onDrop,
      onFileDialogCancel,
      maxFiles: maxFiles,
      multiple: multiple,
      accept: { [accept]: [] },
    });
  /**
   * 선택한 파일을 초기화합니다.
   * isSuccess가 변경될 경우 실행됩니다.
   */
  useEffect(() => {
    if (isSuccess && inputRef.current) {
      acceptedFiles.length = 0;
      acceptedFiles.splice(0, acceptedFiles.length);
      inputRef.current.value = '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef, isSuccess]);

  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 ml-1 text-xs">{label}</label>}
      <div
        className="flex min-h-56 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 text-gray-600"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 break-keep px-4 text-center text-sm">
          {acceptedFiles.length > 0 ? (
            <>
              <ul>
                {files.map((file) => (
                  <li
                    key={file.name}
                    className="flex flex-col items-center gap-1"
                  >
                    <img
                      className="size-20 rounded-lg border object-cover"
                      alt={file.name}
                      src={file.preview}
                      onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                      }}
                    />
                    <div>
                      <p>{file.name}</p>
                      <p>{file.size} bytes</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p>
                총 {acceptedFiles.length}개의 파일이 첨부됐어요,&nbsp;
                <u>클릭하면 다시 업로드</u> 할 수 있어요.
              </p>
            </>
          ) : isDragActive ? (
            <>
              <FileEarmarkArrowUpOutline width={46} height={46} />
              <p>파일이 인식됐어요, 지금 놓으시면 돼요!</p>
            </>
          ) : (
            <>
              <FileEarmarkDiffOutline width={46} height={46} />
              <p>여기로 끌어다 놓아주세요.</p>
              <p>또는</p>
              <Button type="button" size="sm">
                파일 선택하기
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Uploader;
