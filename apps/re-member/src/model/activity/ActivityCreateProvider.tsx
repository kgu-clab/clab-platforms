import { useState, type ReactNode } from "react";
import { ActivityCreateContext } from "./ActivityCreateContext";

interface ActivityCreateProviderProps {
  children: ReactNode;
}

export const ActivityCreateProvider = ({
  children,
}: ActivityCreateProviderProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"study" | "project">("study");
  const [description, setDescription] = useState("");
  const [curriculumList, setCurriculumList] = useState([
    "1주차",
    "2주차",
    "3주차",
  ]);

  const [target, setTarget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubLink, setGithubLink] = useState("");

  const handleAddCurriculum = () => {
    const nextWeek = curriculumList.length + 1;
    setCurriculumList([...curriculumList, `${nextWeek}주차`]);
  };

  const handleCurriculumClick = (index: number) => {
    console.log("커리큘럼 클릭:", index);
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const value = {
    currentStep,
    setCurrentStep,
    title,
    setTitle,
    category,
    setCategory,
    description,
    setDescription,
    curriculumList,
    setCurriculumList,
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
    handleAddCurriculum,
    handleCurriculumClick,
    handleNext,
    handlePrev,
  };

  return (
    <ActivityCreateContext.Provider value={value}>
      {children}
    </ActivityCreateContext.Provider>
  );
};
