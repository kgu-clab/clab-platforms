import { PATH } from '@/constants';
import Link from 'next/link';

export default function HelpQuestion() {
  return (
    <p className="text-sm text-neutral-300">
      문제가 생기셨나요?{' '}
      <Link
        href={PATH.ASK}
        className="text-bold text-md text-white underline decoration-purple-500 after:content-['_↗']"
      >
        문의하러가기
      </Link>
    </p>
  );
}
