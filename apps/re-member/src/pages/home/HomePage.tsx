import { Button, Header, Scrollable, Section } from "@/components/common";
import { HomeRankingList } from "@/components/home";
import { BottomNavbar } from "@/components/menu";

export default function HomePage() {
  return (
    <>
      <Header
        left={<img src="/logo/logo.svg" alt="clab" className="w-15" />}
        className="absolute left-0 right-0 top-0 bg-white"
      />
      <Scrollable className="pt-header-height gap-3xl">
        <Section title="안녕하세요, 유진님!" className="px-gutter">
          <div className="gap-lg flex w-full">
            <div className="h-50 flex-1 rounded-xl bg-gray-200" />
            <div className="h-50 flex-1 rounded-xl bg-gray-200" />
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
          <HomeRankingList />
        </Section>
      </Scrollable>
      <BottomNavbar />
    </>
  );
}
