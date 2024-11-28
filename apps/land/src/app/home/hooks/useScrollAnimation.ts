import { useEffect, useState } from 'react';

export default function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.scroll-fade');
      const direction = element?.getBoundingClientRect();
      const isInScreen =
        direction &&
        direction.top < window.innerHeight - 300 &&
        direction.bottom >= 0;

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
  }, []);

  return isVisible;
}
