import { useEffect, useState } from 'react';

export default function useScrollAnimation(targetClass: string) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector(`.${targetClass}`);
      if (!element) return; // 요소가 없으면 반환
      const direction = element.getBoundingClientRect();
      const isInScreen =
        direction.top < window.innerHeight - 300 && direction.bottom >= 0;

      if (isInScreen) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [targetClass]);

  return isVisible;
}
