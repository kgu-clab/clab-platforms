import { Button } from '@clab/design-system';
import Section from '@components/common/Section/Section';
import type { HireItem } from '@type/hire';

const HireContentSection = ({
  careerLevel,
  employmentType,
  companyName,
  recruitmentPeriod,
  jobPostingUrl,
}: HireItem) => {
  return (
    <Section className="border-none">
      <Section.Header title="모집 요강" />
      <Section.Body className="items-center flex flex-col space-y-12">
        <table className="w-full">
          <tbody className="divide-y text-center">
            <tr>
              <td className="py-4 text-gray-500">경력 수준</td>
              <td>{careerLevel}</td>
            </tr>
            <tr>
              <td className="py-4 text-gray-500">고용 형태</td>
              <td>{employmentType}</td>
            </tr>
            <tr>
              <td className="py-4 text-gray-500">기업명</td>
              <td>{companyName}</td>
            </tr>
            <tr>
              <td className="py-4 text-gray-500">채용 기간</td>
              <td>{recruitmentPeriod}</td>
            </tr>
          </tbody>
        </table>
        <Button
          color="green"
          onClick={() => window.open(jobPostingUrl)}
          className="px-12"
        >
          지원하러 가기
        </Button>
      </Section.Body>
    </Section>
  );
};

export default HireContentSection;
