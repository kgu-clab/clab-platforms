import {
  Button,
  Chip,
  Field,
  Header,
  Scrollable,
  Section,
  Title,
} from "@/components/common";
import { useNavigate } from "react-router";
import { GoChevronLeft } from "react-icons/go";
import { MOCK_BOOK } from "@/shared/mock/library";

export default function LibraryDetailPage() {
  const navigate = useNavigate();

  const isAvailable = MOCK_BOOK.borrowerId === null;

  const formatDate = (dateString: string) => {
    return dateString.split("T")[0];
  };

  return (
    <>
      <Scrollable>
        <Header
          left={
            <button onClick={() => navigate(-1)}>
              <GoChevronLeft size={24} />
            </button>
          }
          className="z-100 absolute left-0 right-0 top-0 bg-transparent"
        />

        <div className="absolute left-0 right-0 top-0 h-[50vh] w-full bg-gray-200">
          <div className="relative flex items-end justify-center overflow-hidden px-6 pb-12 pt-16">
            {MOCK_BOOK.imageUrl && MOCK_BOOK.imageUrl !== "없음" && (
              <img
                src={MOCK_BOOK.imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full scale-125 object-cover blur-sm brightness-75"
              />
            )}

            <div className="z-10 flex items-stretch justify-center gap-2">
              <div className="aspect-3/4 w-40 shadow-lg">
                {MOCK_BOOK.imageUrl && MOCK_BOOK.imageUrl !== "없음" ? (
                  <img
                    src={MOCK_BOOK.imageUrl}
                    alt={MOCK_BOOK.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-2 flex h-full w-full items-center justify-center">
                    <span className="text-gray-4 text-12-regular">
                      이미지 없음
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between gap-2">
                <button className="border-gray-2 gap-sm flex flex-1 flex-col items-center justify-center bg-white px-4 py-3 shadow-lg">
                  <span className="text-lg">💚</span>
                  <span className="text-12-medium text-gray-5">교보문고</span>
                </button>
                <button className="border-gray-2 gap-sm flex flex-1 flex-col items-center justify-center  bg-white px-4 py-3 shadow-lg">
                  <span className="text-lg">💚</span>
                  <span className="text-12-medium text-gray-5">Yes24</span>
                </button>
                <button className="border-gray-2 gap-sm flex flex-1 flex-col items-center justify-center bg-white px-4 py-3 shadow-lg">
                  <span className="text-lg">💜</span>
                  <span className="text-12-medium text-gray-5">알라딘</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-gutter rounded-t-bottom-navbar pb-bottom-padding gap-3xl relative z-50 mt-[36vh] flex h-full flex-col bg-white pt-8">
          <Title>{MOCK_BOOK.title}</Title>

          <div className="space-y-xs">
            <Field title="작가" description={MOCK_BOOK.author} />
            <Field title="출판사" description={MOCK_BOOK.publisher} />
            <Field
              title="등록일"
              description={formatDate(MOCK_BOOK.createdAt)}
            />
            <Field
              title="변경일"
              description={formatDate(MOCK_BOOK.updatedAt)}
            />
          </div>

          <div className="gap-xs flex items-center">
            <Chip color="purple">{MOCK_BOOK.category}</Chip>
            <Chip color={isAvailable ? "green" : "yellow"}>
              {isAvailable ? "대여가능" : "대여중"}
            </Chip>
          </div>

          <Section title="대여 내역">
            {MOCK_BOOK.borrowerName ? (
              <p className="text-14-regular text-gray-5">
                {MOCK_BOOK.borrowerName}님이 대여 중 (반납 예정일:{" "}
                {MOCK_BOOK.dueDate})
              </p>
            ) : (
              <p className="text-14-regular text-gray-4">
                대여 내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
                내역이 없습니다대여 내역이 없습니다대여 내역이 없습니다대여
              </p>
            )}
          </Section>

          <footer className="z-999 h-bottom-navbar-height px-gutter border-gray-2 fixed bottom-0 left-0 right-0 box-border flex items-center justify-center border-t bg-white">
            <Button>대여 신청</Button>
          </footer>
        </div>
      </Scrollable>
    </>
  );
}
