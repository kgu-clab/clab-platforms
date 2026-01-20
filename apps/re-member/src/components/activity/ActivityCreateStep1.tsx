import { Input, Section, Button } from "@/components/common";
import ActivityCurriculumItem from "./ActivityCurriculumItem";
import { useActivityCreate } from "@/model/activity";
import { IoAdd } from "react-icons/io5";

export default function ActivityCreateStep1() {
  const {
    title,
    setTitle,
    category,
    setCategory,
    description,
    setDescription,
    curriculumList,
    handleAddCurriculum,
    handleCurriculumClick,
  } = useActivityCreate();
  return (
    <>
      <Section
        className="gap-xl mt-3xl"
        title={
          <h2 className="text-18-semibold px-gutter text-black">
            활동 제목을 입력해주세요.
          </h2>
        }
      >
        <div className="px-gutter">
          <Input
            type="text"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="underline"
          />
        </div>
      </Section>

      <Section
        className="gap-xl"
        title={
          <h2 className="text-18-semibold pt-md px-gutter text-black">
            카테고리를 선택해주세요.
          </h2>
        }
      >
        <div className="px-gutter gap-md flex items-center">
          <Button
            size="small"
            color={category === "study" ? "outlineActive" : "outlineDisabled"}
            onClick={() => setCategory("study")}
          >
            스터디
          </Button>
          <Button
            size="small"
            color={category === "project" ? "outlineActive" : "outlineDisabled"}
            onClick={() => setCategory("project")}
          >
            프로젝트
          </Button>
        </div>
      </Section>

      <Section
        className="gap-xl"
        title={
          <h2 className="text-18-semibold pt-md px-gutter text-black">
            활동 내용을 입력해주세요.
          </h2>
        }
      >
        <div className="px-gutter">
          <Input
            type="text"
            placeholder="활동에 대해 한 줄로 설명해 주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="underline"
          />
        </div>
      </Section>

      <Section
        className="gap-xl"
        title={
          <div className="gap-sm pt-md px-gutter flex flex-col">
            <h2 className="text-18-semibold text-black">
              활동 커리큘럼을 입력해주세요.
            </h2>
            <p className="text-14-medium text-gray-4">
              커리큘럼은 나중에 수정할 수 있어요.
            </p>
          </div>
        }
      >
        <div className="px-gutter gap-lg flex w-full flex-col items-end">
          {curriculumList.map((curriculum, index) => (
            <ActivityCurriculumItem
              key={index}
              label={curriculum}
              onClick={() => handleCurriculumClick(index)}
            />
          ))}
          <button
            onClick={handleAddCurriculum}
            className="bg-gray-1 gap-sm px-lg py-md flex items-center justify-center rounded-full"
            type="button"
          >
            <p className="text-14-medium text-gray-4">커리큘럼 추가하기</p>
            <IoAdd size={16} className="text-gray-4" />
          </button>
        </div>
      </Section>
    </>
  );
}
