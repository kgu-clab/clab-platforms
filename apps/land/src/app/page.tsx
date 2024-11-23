import { PATH } from '@/constants';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect(PATH.HOME);
}
