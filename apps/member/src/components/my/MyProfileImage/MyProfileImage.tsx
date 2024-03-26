import Image from '@components/common/Image/Image';
import type { ProfileData } from '@type/profile';
import { createImageUrl } from '@utils/api';
import { getProfileRingStyle } from '@utils/style';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Input } from '@clab/design-system';

interface MyProfileImageProps {
  data: ProfileData;
  isEdit: boolean;
  onChange: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const MyProfileImage = ({ isEdit, data, onChange }: MyProfileImageProps) => {
  const [profileImage, setProfileImage] = useState<string>(data.imageUrl);

  const handleProfileImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImage(reader.result as string);
        }
      };
      if (e.target.files && e.target.files.length > 0) {
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    [],
  );

  const onClickRemoveProfileImage = useCallback(() => {
    setProfileImage('');
  }, []);

  useEffect(() => {
    onChange((prev) => ({ ...prev, imageUrl: profileImage }));
  }, [onChange, profileImage]);

  return (
    <div className="flex flex-col items-center text-center">
      <label
        htmlFor="imageUrl"
        className={classNames(
          'rounded-full ring ring-offset-1',
          getProfileRingStyle(data.roleLevel),
        )}
      >
        <Image
          width="w-32"
          height="h-32"
          src={createImageUrl(profileImage)}
          alt=""
          className={classNames('object-cover rounded-full bg-white', {
            'cursor-pointer': isEdit,
          })}
        />
      </label>
      <Input
        id="imageUrl"
        name="imageUrl"
        type="file"
        className="hidden"
        onChange={handleProfileImageChange}
        disabled={!isEdit}
      />
      <div className="mt-4">
        {isEdit && (
          <div className="space-x-2 text-xs text-sky-500">
            <button>사진 변경</button>
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
