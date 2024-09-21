import File from '@components/common/File/File';
import Image from '@components/common/Image/Image';

import { isImageFile } from '@utils/api';

import type { ResponseFile } from '@type/api';

interface ActivityNoticeModalProps {
  content: string;
  files?: Array<ResponseFile>;
}

export const ActivityNoticeModal = ({
  content,
  files,
}: ActivityNoticeModalProps) => {
  return (
    <div className="flex flex-col gap-4">
      {files?.map((file) => (
        <div key={file.fileUrl} className="mx-auto flex flex-col gap-2 ">
          {isImageFile(file.fileUrl) ? (
            <Image
              src={file.fileUrl}
              alt={file.originalFileName}
              height="w-[300px]"
              className="object-cover"
              isFile
            />
          ) : (
            <File
              href={file.fileUrl}
              name={file.originalFileName}
              key={file.fileUrl}
            />
          )}
        </div>
      ))}
      <hr />
      <p>{content}</p>
    </div>
  );
};
