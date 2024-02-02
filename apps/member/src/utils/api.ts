export const createPagination = (
  endpoint: string,
  page: number,
  size: number,
) => {
  return `${endpoint}?page=${page}&size=${size}`;
};
