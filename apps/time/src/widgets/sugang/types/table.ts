import { TABLE_HEADERS } from '@/widgets/sugang/model';

export type Mode = keyof typeof TABLE_HEADERS;
export type HeaderType = (typeof TABLE_HEADERS)[Mode][number];
