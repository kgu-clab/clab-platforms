export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type SecretKey = {
  secretKey: string;
};
/**
 * OAuth Custom Header Type : X-Clab-Auth
 * 토큰과 시크릿키 중 하나를 사용합니다.
 * 최초 로그인시 시크릿키를 전달 받고, 이후에는 토큰을 사용합니다.
 */
export type XClabAuth = Token | SecretKey;
/**
 * API Base Response Type
 * data: OTP 사용 여부, 로그인 과정에서 실패일 경우 null
 */
export interface ServerResponse {
  success: boolean;
  data: boolean | null;
}
