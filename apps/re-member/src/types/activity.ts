export type ActivityCategory = "STUDY" | "PROJECT";

export type ActivityStatus = "WAITING" | "PROGRESSING" | "END";

export interface ActivityLeader {
  id: string;
  name: string;
}

export interface ActivityData {
  id: number;
  name: string;
  content: string;
  category: ActivityCategory;
  subject: string;
  status: ActivityStatus;
  imageUrl: string;
  leaders: ActivityLeader[];
  participantCount: number;
  weeklyActivityCount: number;
  createdAt: string;
}
