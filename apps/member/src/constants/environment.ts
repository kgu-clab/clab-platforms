type ModeType = 'development' | 'production';

export const MODE: ModeType = import.meta.env.VITE_MODE;
