import { Button } from '@clab-platforms/design-system';

import Image from '@components/common/Image/Image';

import { useModal } from '@hooks/common/useModal';
import { createImageUrl } from '@utils/api';

interface SupportErrorImageProps {
  imageUrl?: string;
}

const SupportErrorImage = ({ imageUrl }: SupportErrorImageProps) => {
  const { open } = useModal();

  if (!imageUrl) {
    return null;
  }

  const handleImageClick = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
  };

  const handleErrorImageModalOpen = () => {
    const parsingImageUrl = createImageUrl(imageUrl);
    open({
      title: '오류이미지',
      content: (
        <Image
          src={parsingImageUrl}
          alt="오류이미지"
          onClick={() => handleImageClick(parsingImageUrl)}
        />
      ),
    });
  };

  return <Button onClick={handleErrorImageModalOpen}>오류 이미지</Button>;
};

export default SupportErrorImage;
