import { Header, Scrollable, Section, Title } from "@/components/common";
import { ActivityStudyItem } from "@/components/activity";
import { MOCK_ACTIVITIES } from "@/shared/mock/activity";
import { useNavigate } from "react-router";
import { GoChevronLeft } from "react-icons/go";

export default function MyActivityPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header
        left={
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <GoChevronLeft size={24} />
            <Title>내 활동</Title>
          </button>
        }
        className="z-100 absolute left-0 right-0 top-0 bg-white"
      />
      <Scrollable className="pt-header-height pb-bottom-padding">
        <Section className="px-gutter py-xl">
          <Section.List>
            {MOCK_ACTIVITIES.map((activity) => (
              <ActivityStudyItem key={activity.id} activity={activity} />
            ))}
          </Section.List>
        </Section>
      </Scrollable>
    </>
  );
}
