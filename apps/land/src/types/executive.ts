import { EXECUTIVE_POSITION } from '@/constants';

export type ExecutivePosition = keyof typeof EXECUTIVE_POSITION;

export type Executive = {
  executiveId: string;
  name: string;
  email: string;
  interests: string;
  position: ExecutivePosition;
  imageUrl: string;
};
