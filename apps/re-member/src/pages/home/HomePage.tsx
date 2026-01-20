import { Button, Header, Scrollable, Section } from "@/components/common";
import { BottomNavbar } from "@/components/menu";
import { HomeCarousel, HomePostItem, HomeLink } from "@/components/home";
import { ROUTE } from "@/shared/config/route";
import {
  IoCalendarOutline,
  IoPeopleOutline,
  IoBookOutline,
} from "react-icons/io5";
import { communityPostsList } from "@/shared/mock/community-posts";

export default function HomePage() {
  return (
    <>
      <Header
        left={<img src="/logo/logo.svg" alt="clab" className="w-15" />}
        className="z-999 absolute left-0 right-0 top-0 bg-white"
      />
      <Scrollable className="pt-header-height gap-3xl pb-bottom-padding">
        <Section className="mt-xl">
          <HomeCarousel />
        </Section>

        <Section title="바로가기" className="px-gutter">
          <div className="gap-lg grid grid-cols-3">
            <HomeLink
              to={ROUTE.ACTIVITY_STUDY}
              icon={<IoCalendarOutline size={32} className="text-primary" />}
              label="내 활동"
            />
            <HomeLink
              to={ROUTE.COMMUNITY}
              icon={<IoPeopleOutline size={32} className="text-primary" />}
              label="커뮤니티"
            />
            <HomeLink
              to={ROUTE.LIBRARY}
              icon={<IoBookOutline size={32} className="text-primary" />}
              label="도서관"
            />
          </div>
        </Section>

        <Section title="커뮤니티 인기 게시글" className="px-gutter">
          <div className="gap-sm flex items-center">
            <Button size="small" color="dark">
              전체
            </Button>
            <Button size="small" color="ghost">
              자유
            </Button>
            <Button size="small" color="ghost">
              질문
            </Button>
          </div>
          <Section.List>
            {communityPostsList.map((post) => (
              <HomePostItem key={post.id} {...post} />
            ))}
          </Section.List>
        </Section>
      </Scrollable>
      <BottomNavbar />
    </>
  );
}
