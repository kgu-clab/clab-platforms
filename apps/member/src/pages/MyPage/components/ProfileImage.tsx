import { useEffect, useRef, useState } from 'react';

import { Input } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import Avatar from '@components/common/Avatar/Avatar';

import type { MemberProfileType } from '@type/member';

interface Props {
  value: MemberProfileType;
  onChange: React.Dispatch<React.SetStateAction<MemberProfileType>>;
  disabled?: boolean;
}

export function ProfileImage({ value, onChange, disabled = false }: Props) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>(value.imageUrl ?? '');

  const handleChangeButtonClick = () => {
    imageInputRef.current?.click();
  };

  const handleDeleteClick = () => {
    setImage('');
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result as string);
      }
    };
    if (e.target.files && e.target.files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    onChange((prev) => ({ ...prev, imageUrl: image }));
  }, [onChange, image]);

  return (
    <div className="flex flex-col items-center text-center">
      <label htmlFor="imageUrl">
        <Avatar
          src={image}
          size="lg"
          roleLevel={value.roleLevel}
          className={cn({ 'cursor-pointer': !disabled })}
        />
      </label>
      <Input
        ref={imageInputRef}
        id="imageUrl"
        name="imageUrl"
        type="file"
        className="hidden"
        onChange={handleProfileImageChange}
        disabled={disabled}
        accept="image/png, image/jpeg, image/jpg"
      />
      <div className="mt-4">
        {!disabled && (
          <div className="space-x-2 text-xs text-sky-500">
            <button onClick={handleChangeButtonClick}>사진 변경</button>
            <button onClick={handleDeleteClick}>삭제</button>
          </div>
        )}
        <p className="text-xl font-bold">{value.name}</p>
        <p className="text-sm font-semibold text-gray-500">{value.id}</p>
      </div>
    </div>
  );
}
