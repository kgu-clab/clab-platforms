import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Section from '@components/common/Section/Section';
import ProcessSection from '@components/support/ProcessSection/ProcessSection';
import RequestForm from '@components/support/RequestForm/RequestForm';

const SupportPage = () => {
  return (
    <Content>
      <Header title="동아리 지원 신청" />
      <Section className="space-y-10 p-12">
        <ProcessSection />
        <RequestForm />
      </Section>
    </Content>
  );
};

export default SupportPage;
