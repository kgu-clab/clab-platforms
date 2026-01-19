import {
  Header,
  Scrollable,
  StepProgressBar,
  Button,
} from "@/components/common";
import ActivityCreateStep1 from "@/components/activity/ActivityCreateStep1";
import ActivityCreateStep2 from "@/components/activity/ActivityCreateStep2";
import { ActivityCreateProvider, useActivityCreate } from "@/model/activity";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router";

function ActivityCreatePageContent() {
  const navigate = useNavigate();
  const { currentStep, handlePrev, handleNext } = useActivityCreate();

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
        currentStep={currentStep}
        totalSteps={2}
        className="top-header-height fixed left-0 right-0 bg-white"
      />
      <Scrollable className="gap-3xl pb-bottom-padding pt-[calc(var(--spacing-header-height)+16px)]">
        {currentStep === 1 && <ActivityCreateStep1 />}
        {currentStep === 2 && <ActivityCreateStep2 />}
      </Scrollable>
      <div className="p-xl border-gray-2 fixed bottom-0 left-0 right-0 border-t bg-white">
        <div className="gap-md flex">
          {currentStep > 1 && (
            <Button size="large" color="ghost" onClick={handlePrev}>
              이전
            </Button>
          )}
          {currentStep < 2 ? (
            <Button size="large" color="active" onClick={handleNext}>
              다음
            </Button>
          ) : (
            <Button
              size="large"
              color="active"
              onClick={() => console.log("제출")}
            >
              제출하기
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default function ActivityCreatePage() {
  return (
    <ActivityCreateProvider>
      <ActivityCreatePageContent />
    </ActivityCreateProvider>
  );
}
