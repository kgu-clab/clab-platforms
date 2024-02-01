export interface ServerResponse<T = unknown> {
  success: boolean;
  data: T;
}
