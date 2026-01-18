import { PlusButton, Section } from "@/components/common";
import { CommunityPostList, CommunityFilter } from "@/components/community";
import { CATEGORY } from "@/types/community";
import { useSearchParams } from "react-router";

export default function CommunityPage() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const handleWriteClick = () => {
    // 작성 페이지 이동
  };

  return (
    <>
      <Section>
        <CommunityFilter tab={tab ?? CATEGORY.NOTICE} />
        <CommunityPostList />
        <PlusButton onClick={handleWriteClick} />
      </Section>
    </>
  );
}
