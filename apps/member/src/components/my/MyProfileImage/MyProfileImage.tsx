import { useCallback, useEffect, useRef, useState } from 'react';

import { Input } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import Avatar from '@components/common/Avatar/Avatar';

import type { MemberProfileType } from '@type/member';

interface MyProfileImageProps {
  data: MemberProfileType;
  isEdit: boolean;
  onChange: React.Dispatch<React.SetStateAction<MemberProfileType>>;
}

const MyProfileImage = ({ isEdit, data, onChange }: MyProfileImageProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>(data.imageUrl ?? '');

  const handleChangeButtonClick = useCallback(() => {
    imageInputRef.current?.click();
  }, []);

  const onClickRemoveProfileImage = useCallback(() => {
    setImage(''); // 값이 없을 경우 기본 이미지로 변경
  }, []);

  const handleProfileImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };
      if (e.target.files && e.target.files.length > 0) {
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    [],
  );

  useEffect(() => {
    onChange((prev) => ({ ...prev, imageUrl: image }));
  }, [onChange, image]);

  return (
    <div className="flex flex-col items-center text-center">
      <label htmlFor="imageUrl">
        <Avatar
          src={image}
          size="lg"
          roleLevel={data.roleLevel}
          className={cn({ 'cursor-pointer': isEdit })}
        />
      </label>
      <Input
        ref={imageInputRef}
        id="imageUrl"
        name="imageUrl"
        type="file"
        className="hidden"
        onChange={handleProfileImageChange}
        disabled={!isEdit}
        accept="image/png, image/jpeg, image/jpg"
      />
      <div className="mt-4">
        {isEdit && (
          <div className="space-x-2 text-xs text-sky-500">
            <button onClick={handleChangeButtonClick}>사진 변경</button>
            <button onClick={onClickRemoveProfileImage}>삭제</button>
          </div>
        )}
        <p className="text-xl font-bold">{data.name}</p>
        <p className="text-sm font-semibold text-gray-500">{data.id}</p>
      </div>
    </div>
  );
};

export default MyProfileImage;
