export interface SharedAccountUsageType {
  sharedAccountId: number;
  startTime?: string | null;
  endTime: string;
}

export interface SharedAccountUserItem {
  id: number;
  username: string;
  platformName: string;
  startTime: string;
  endTime: string;
  memberId: string;
  status: string;
  createdAt: string;
}

export interface AccountType {
  id: number;
  username: string;
  password: string;
  platformName: string;
  platformUrl: string;
  inUse: boolean;
}
