import { useState } from "react";
import {
  Header,
  Scrollable,
  Textarea,
  Input,
  Section,
  Button,
} from "@/components/common";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router";

export default function LibraryCreatePage() {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const maxReasonLength = 400;

  const handleSubmit = () => {
    // TODO: 도서 신청 로직 구현
    console.log({ bookTitle, author, publisher, reason });
    navigate(-1);
  };

  const isSubmitDisabled =
    !bookTitle.trim() || !author.trim() || !reason.trim();

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
      <Scrollable className="gap-3xl pt-header-height pb-bottom-navbar-height">
        <Section
          className="gap-xl"
          title={
            <h2 className="pt-md px-gutter text-[18px] font-semibold leading-[1.4] text-black">
              책 제목을 입력해주세요.
            </h2>
          }
        >
          <div className="px-gutter">
            <Input
              type="text"
              placeholder="책 제목을 입력해주세요"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              variant="underline"
            />
          </div>
        </Section>

        <Section
          className="gap-xl"
          title={
            <h2 className="pt-md px-gutter text-[18px] font-semibold leading-[1.4] text-black">
              저자를 입력해주세요.
            </h2>
          }
        >
          <div className="px-gutter">
            <Input
              type="text"
              placeholder="저자를 입력해주세요"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              variant="underline"
            />
          </div>
        </Section>

        <Section
          className="gap-xl"
          title={
            <h2 className="pt-md px-gutter text-[18px] font-semibold leading-[1.4] text-black">
              출판사를 입력해주세요.
            </h2>
          }
        >
          <div className="px-gutter">
            <Input
              type="text"
              placeholder="출판사를 입력해주세요 (선택)"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              variant="underline"
            />
          </div>
        </Section>

        <Section
          className="gap-xl"
          title={
            <h2 className="pt-md px-gutter text-[18px] font-semibold leading-[1.4] text-black">
              신청 사유를 입력해주세요.
            </h2>
          }
        >
          <div className="px-gutter">
            <Textarea
              placeholder="이 책을 신청하는 이유를 간단하게 작성해주세요."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              maxLength={maxReasonLength}
              showCounter={true}
            />
          </div>
        </Section>
      </Scrollable>

      <footer className="z-999 h-bottom-navbar-height px-gutter border-gray-2 fixed bottom-0 left-0 right-0 box-border flex items-center justify-center border-t bg-white">
        <Button
          onClick={handleSubmit}
          color={isSubmitDisabled ? "disabled" : "active"}
          disabled={isSubmitDisabled}
        >
          신청하기
        </Button>
      </footer>
    </>
  );
}
