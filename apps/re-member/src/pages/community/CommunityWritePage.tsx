import { useState } from "react";
import {
  CategoryChipList,
  CommunityWriteBottomBar,
} from "@/components/community";
import {
  Header,
  Scrollable,
  Textarea,
  Input,
  Section,
} from "@/components/common";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router";

export default function CommunityWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("free");
  const navigate = useNavigate();

  const maxContentLength = 1000;

  const handleSubmit = () => {
    // TODO: 글 작성 로직 구현
    console.log({ title, content, selectedCategory });
  };

  const handleImageClick = () => {
    // TODO: 이미지 업로드 로직 구현
    console.log("이미지 추가");
  };

  const handleVoteClick = () => {
    // TODO: 투표 추가 로직 구현
    console.log("투표 추가");
  };

  const isSubmitDisabled = !title.trim() || !content.trim();

  return (
    <>
      <Header
        left={
          <button onClick={() => navigate(-1)}>
            <GoChevronLeft size={24} />
          </button>
        }
        className="fixed left-0 right-0 top-0 bg-transparent"
      />
      <Scrollable className="gap-3xl pt-header-height">
        <Section
          className="gap-xl"
          title={
            <h2 className="text-18-semibold pt-md px-gutter text-black">
              글 제목을 입력해주세요.
            </h2>
          }
        >
          <div className="px-gutter">
            <Input
              type="text"
              placeholder="제목을 입력해주세요"
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
          <div className="px-gutter">
            <CategoryChipList
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </Section>

        <Section
          className="gap-xl"
          title={
            <h2 className="text-18-semibold pt-md px-gutter text-black">
              내용을 입력해주세요.
            </h2>
          }
        >
          <div className="px-gutter">
            <Textarea
              placeholder="어떤 이야기를 나누고 싶으신가요?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={maxContentLength}
              showCounter={true}
            />
          </div>
        </Section>
      </Scrollable>
      <CommunityWriteBottomBar
        onImageClick={handleImageClick}
        onVoteClick={handleVoteClick}
        onSubmit={handleSubmit}
        disabled={isSubmitDisabled}
      />
    </>
  );
}
