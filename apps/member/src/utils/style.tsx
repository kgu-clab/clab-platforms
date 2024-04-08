type roleLevel = number | null;

export const getProfileRingStyle = (level: roleLevel) => {
  return {
    1: 'ring-gray-500',
    2: 'ring-purple-500',
    3: 'ring-red-500 drop-shadow-lg',
  }[level ?? 1];
};
