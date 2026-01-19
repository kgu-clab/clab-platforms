import { useState } from "react";
import {
  Header,
  Scrollable,
  Input,
  Section,
  StepProgressBar,
  Button,
} from "@/components/common";
import ActivityCurriculumItem from "@/components/activity/ActivityCurriculumItem";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router";
import { IoAdd } from "react-icons/io5";

export default function ActivityCreatePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"study" | "project">("study");
  const [description, setDescription] = useState("");
  const [curriculumList, setCurriculumList] = useState([
    "1주차",
    "2주차",
    "3주차",
  ]);
  const navigate = useNavigate();

  const handleAddCurriculum = () => {
    const nextWeek = curriculumList.length + 1;
    setCurriculumList([...curriculumList, `${nextWeek}주차`]);
  };

  const handleCurriculumClick = (index: number) => {
    // TODO: 커리큘럼 상세 편집 페이지로 이동
    console.log("커리큘럼 클릭:", index);
  };

  return (
    <>
      <Header
        left={
          <button onClick={() => navigate(-1)}>
            <GoChevronLeft size={24} />
          </button>
        }
        className="fixed left-0 right-0 top-0 bg-white"
      />
      <StepProgressBar
        currentStep={1}
        totalSteps={2}
        className="top-header-height fixed left-0 right-0 bg-white"
      />
      <Scrollable className="gap-3xl pb-bottom-padding pt-[calc(var(--spacing-header-height)+16px)]">
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
              className="px-gutter"
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
              color={
                category === "project" ? "outlineActive" : "outlineDisabled"
              }
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
      </Scrollable>
    </>
  );
}
