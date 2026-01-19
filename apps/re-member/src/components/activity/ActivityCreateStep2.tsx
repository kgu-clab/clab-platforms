import { Input, Section, Button } from "@/components/common";
import { useActivityCreate } from "@/model/activity";

export default function ActivityCreateStep2() {
  const {
    target,
    setTarget,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    techStack,
    setTechStack,
    githubLink,
    setGithubLink,
  } = useActivityCreate();
  const handleStartDateClick = () => {
    console.log("시작일 선택", setStartDate);
  };

  const handleEndDateClick = () => {
    console.log("종료일 선택", setEndDate);
  };

  return (
    <>
      <Section
        className="gap-xl mt-3xl"
        title={
          <h2 className="text-18-semibold px-gutter text-black">
            활동 대상을 알려주세요.
            <span className="text-primary">*</span>
          </h2>
        }
      >
        <div className="px-gutter">
          <Input
            type="text"
            placeholder="2학년 학우, 휴학생, 오프라인 모임 참여 가능하신 분 ..."
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            variant="underline"
          />
        </div>
      </Section>

      <Section
        className="gap-xl"
        title={
          <h2 className="text-18-semibold pt-md px-gutter text-black">
            활동 기간을 알려주세요.
            <span className="text-primary">*</span>
          </h2>
        }
      >
        <div className="px-gutter gap-md flex items-center">
          <Button
            size="small"
            color={startDate ? "outlineActive" : "outlineDisabled"}
            onClick={handleStartDateClick}
            className="flex-1"
          >
            {startDate ? `시작일 | ${startDate}` : "시작일 지정하기"}
          </Button>
          <Button
            size="small"
            color={endDate ? "outlineActive" : "outlineDisabled"}
            onClick={handleEndDateClick}
            className="flex-1"
          >
            {endDate ? `종료일 | ${endDate}` : "종료일 지정하기"}
          </Button>
        </div>
      </Section>

      <Section
        className="gap-xl"
        title={
          <div className="gap-sm px-gutter flex flex-col">
            <h2 className="text-18-semibold text-black">
              활동에서 사용할 기술 스택을 알려주세요.
              <span className="text-primary">*</span>
            </h2>
            <p className="text-14-medium text-gray-4">
              언어, 라이브러리, 프레임워크 구분 없이 적어주세요!
            </p>
          </div>
        }
      >
        <div className="px-gutter">
          <Input
            type="text"
            placeholder="Java, Python, C, C++, Spring, Django ..."
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            variant="underline"
          />
        </div>
      </Section>

      <Section
        className="gap-xl"
        title={
          <h2 className="text-18-semibold px-gutter text-black">
            활동에서 사용하는 Github 링크를 알려주세요.
          </h2>
        }
      >
        <div className="px-gutter">
          <Input
            type="text"
            placeholder="제목을 입력해주세요."
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            variant="underline"
          />
        </div>
      </Section>
    </>
  );
}
