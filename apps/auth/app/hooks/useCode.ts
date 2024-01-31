import { useSearchParams } from 'next/navigation';

export const useCode = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  return { code };
};
