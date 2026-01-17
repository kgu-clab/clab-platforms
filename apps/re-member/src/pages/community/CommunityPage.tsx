import { Section } from "@/components/common";
import {
  CommunityPostList,
  CommunityFilter,
  CommunityWriteButton,
} from "@/components/community";
import { CATEGORY } from "@/app/types/community";
import { useSearchParams } from "react-router";

export default function CommunityPage() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <>
      <Section>
        <CommunityFilter tab={tab ?? CATEGORY.NOTICE} />
        <CommunityPostList />
        <CommunityWriteButton />
      </Section>
    </>
  );
}
