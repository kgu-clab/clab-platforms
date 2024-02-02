import Content from '@components/common/Content/Content';
import Section from '@components/common/Section/Section';

const MyPageSkeleton = () => {
  return (
    <Content>
      <Section className="h-96 animate-pulse">
        <Section.Header title="나의 정보" />
      </Section>
      <Section className="h-32 animate-pulse">
        <Section.Header title="지난 알림" />
      </Section>
      <Section className="h-32 animate-pulse">
        <Section.Header title="나의 게시글" />
      </Section>
      <Section className="h-32 animate-pulse">
        <Section.Header title="나의 댓글" />
      </Section>
    </Content>
  );
};

export default MyPageSkeleton;
