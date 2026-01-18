import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { CATEGORY } from "@/types/community";
import { Button, Dropdown } from "../common";

interface CommunityFilterProps {
  tab: string;
}

export default function CommunityFilter({ tab }: CommunityFilterProps) {
  const [isLatest, setIsLatest] = useState<boolean>(true);

  const onClick = () => {
    setIsLatest(!isLatest);
  };
  return (
    <div className="px-gutter gap-md flex items-center">
      <div className="scrollbar-hide min-w-0 flex-1 overflow-x-auto">
        {tab === CATEGORY.INFORMATION && <InformationFilterOptions />}
        {tab === CATEGORY.QUESTION && <QuestionFilterOptions />}
      </div>
      <Button color="text" size="small" className="shrink-0" onClick={onClick}>
        {isLatest ? "최신순" : "인기순"}
      </Button>
    </div>
  );
}

const INFORMATION_FILTERS: string[] = ["전체", "IT 소식", "채용 정보"];

function InformationFilterOptions() {
  const [activeFilter, setActiveFilter] = useState(INFORMATION_FILTERS[0]);

  return (
    <div className="gap-lg flex overflow-auto">
      {INFORMATION_FILTERS.map((filter) => (
        <Button
          key={filter}
          color={activeFilter === filter ? "outlineActive" : "ghost"}
          size="small"
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}

interface FilterOption {
  label: string;
  value: string;
}

const LANGUAGE_OPTIONS: FilterOption[] = [
  { label: "언어", value: "all" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C/C++", value: "cpp" },
  { label: "Go", value: "go" },
];

const FIELD_OPTIONS: FilterOption[] = [
  { label: "분야", value: "all" },
  { label: "프론트엔드", value: "frontend" },
  { label: "백엔드", value: "backend" },
  { label: "모바일", value: "mobile" },
  { label: "데브옵스", value: "devops" },
  { label: "데이터", value: "data" },
];

const TECH_OPTIONS: FilterOption[] = [
  { label: "기술", value: "all" },
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
  { label: "Node.js", value: "nodejs" },
  { label: "Spring", value: "spring" },
  { label: "AWS", value: "aws" },
];

function QuestionFilterOptions() {
  const [language, setLanguage] = useState<string>("all");
  const [field, setField] = useState<string>("all");
  const [tech, setTech] = useState<string>("all");

  const getSelectedLabel = (options: FilterOption[], value: string) => {
    return (
      options.find((opt) => opt.value === value)?.label ?? options[0].label
    );
  };

  return (
    <div className="gap-md scrollbar-hide flex overflow-y-hidden overflow-x-scroll">
      <Dropdown
        trigger={
          <Button
            color={language === "all" ? "outlineDisabled" : "outlineActive"}
            size="small"
            className="shrink-0 whitespace-nowrap"
          >
            {getSelectedLabel(LANGUAGE_OPTIONS, language)}
            <IoChevronDown className="ml-xs" />
          </Button>
        }
        align="start"
      >
        {LANGUAGE_OPTIONS.map((option) => (
          <Dropdown.Item
            key={option.value}
            onSelect={() => setLanguage(option.value)}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown>

      <Dropdown
        trigger={
          <Button
            color={field === "all" ? "outlineDisabled" : "outlineActive"}
            size="small"
            className="shrink-0 whitespace-nowrap"
          >
            {getSelectedLabel(FIELD_OPTIONS, field)}
            <IoChevronDown className="ml-xs" />
          </Button>
        }
        align="start"
      >
        {FIELD_OPTIONS.map((option) => (
          <Dropdown.Item
            key={option.value}
            onSelect={() => setField(option.value)}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown>

      <Dropdown
        trigger={
          <Button
            color={tech === "all" ? "outlineDisabled" : "outlineActive"}
            size="small"
            className="shrink-0 whitespace-nowrap"
          >
            {getSelectedLabel(TECH_OPTIONS, tech)}
            <IoChevronDown className="ml-xs" />
          </Button>
        }
        align="start"
      >
        {TECH_OPTIONS.map((option) => (
          <Dropdown.Item
            key={option.value}
            onSelect={() => setTech(option.value)}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
}
