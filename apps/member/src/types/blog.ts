export interface BlogPost {
  id: number;
  memberId: string;
  name: string;
  title: string;
  subTitle: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  isOwner: boolean;
}
