import CommunityPostItem from "./CommunityPostItem";
import { MOCK_POSTS } from "@/shared/mock/community";

export default function CommunityPostList() {
  return (
    <div className="flex flex-col">
      {MOCK_POSTS.map((post) => (
        <CommunityPostItem
          key={post.postData.id}
          postData={post.postData}
          chipLabel={post.chipLabel}
        />
      ))}
    </div>
  );
}
