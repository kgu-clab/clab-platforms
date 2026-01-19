import { PlusButton, Section } from "@/components/common";
import { CommunityPostList, CommunityFilter } from "@/components/community";
import { ROUTE } from "@/shared/config/route";
import { CATEGORY } from "@/types/community";
import { useNavigate, useSearchParams } from "react-router";

export default function CommunityPage() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const navigate = useNavigate();

  const handleWriteClick = () => {
    navigate(ROUTE.COMMUNITY_WRITE);
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
