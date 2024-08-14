import { MODAL_KEY } from '@/shared/constants';

export type ModalKey = (typeof MODAL_KEY)[keyof typeof MODAL_KEY];
