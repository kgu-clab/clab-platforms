import { Header, Section } from "@/components/common";
import { BottomNavbar } from "@/components/menu";

export default function HomePage() {
  return (
    <>
      <Header
        left={<img src="/logo/logo.svg" alt="clab" className="w-15" />}
        className="absolute left-0 right-0 top-0 bg-white"
      />
      <div className="pt-header-height scrollbar-hide gap-3xl pb-bottom-padding flex h-full w-full flex-col overflow-y-auto">
        <Section title="안녕하세요, 유진님!" className="px-gutter">
          <div className="gap-lg flex w-full">
            <div className="h-50 flex-1 rounded-xl bg-gray-200" />
            <div className="h-50 flex-1 rounded-xl bg-gray-200" />
          </div>
        </Section>
        <Section title="커뮤니티 인기 게시글" className="px-gutter">
          <Section.List>
            <div className="h-20 w-full rounded-xl bg-gray-200" />
            <div className="h-20 w-full rounded-xl bg-gray-200" />
            <div className="h-20 w-full rounded-xl bg-gray-200" />
            <div className="h-20 w-full rounded-xl bg-gray-200" />
            <div className="h-20 w-full rounded-xl bg-gray-200" />
            <div className="h-20 w-full rounded-xl bg-gray-200" />
          </Section.List>
        </Section>
      </div>
      <BottomNavbar />
    </>
  );
}
