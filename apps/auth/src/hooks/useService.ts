import { SERVICE, type ServiceCode } from '@utils/service';

/**
 * 연결되는 서비스의 정보를 가져옵니다.
 * code 파라미터를 통해 서비스를 구분합니다.
 */
export const useService = (code: ServiceCode) => {
  return SERVICE(code);
};
