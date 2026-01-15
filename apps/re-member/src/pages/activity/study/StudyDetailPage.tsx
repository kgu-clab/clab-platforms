import { StudyMemberGrid } from "@/components/activity";
import {
  Button,
  Chip,
  Field,
  Header,
  Scrollable,
  Section,
} from "@/components/common";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router";

export default function StudyDetailPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Scrollable>
      <Header
        left={
          <button className="focus:outline-none" onClick={handleBack}>
            <GoChevronLeft size={24} />
          </button>
        }
        className="z-999 absolute left-0 right-0 top-0 bg-transparent"
      />

      <div className="absolute left-0 right-0 top-0 h-[40vh] w-full bg-gray-200" />

      <div className="px-gutter rounded-t-bottom-navbar pb-bottom-padding gap-3xl relative z-50 mt-[30vh] flex h-full flex-col bg-white pt-10">
        <Section title="코어팀 플로우 작성 프로젝트">
          <p className="text-gray-5">
            이 사이트의 유저 플로우를 작성할 수 있어요
          </p>
        </Section>

        <div className="space-y-xs">
          <Field title="스터디장" description="장영후(23)" />
          <Field title="기술스택" description="Chrome, Notion, Figma" />
          <Field title="시작일" description="2026-01-01" />
          <Field title="종료일" description="2026-01-01" />
        </div>

        <div className="gap-xs flex items-center">
          <Chip color="purple">프로젝트</Chip>
          <Chip color="green">모집중</Chip>
        </div>

        <Section title="커리큘럼">
          <p className="text-gray-5">
            이 사이트의 유저 플로우를 작성할 수 있어요
          </p>
        </Section>

        <Section title="참여 인원">
          <StudyMemberGrid />
        </Section>

        <footer className="z-999 h-bottom-navbar-height px-gutter border-gray-2 fixed bottom-0 left-0 right-0 box-border flex items-center justify-center border-t bg-white">
          <Button>참여 신청</Button>
        </footer>
      </div>
    </Scrollable>
  );
}
