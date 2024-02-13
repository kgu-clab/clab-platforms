import { Button } from '@clab/design-system';
import Section from '@components/common/Section/Section';
import { useHirePost } from '@hooks/queries/useHirePost';

interface HireContentSectionProps {
  id: number;
}

const HireContentSection = ({ id }: HireContentSectionProps) => {
  const { data: hireData } = useHirePost(Number(id));

  return (
    <Section className="border-none">
      <Section.Header title="모집 요강" />
      <Section.Body className="items-center flex flex-col space-y-12">
        <table className="w-full">
          <tbody className="divide-y text-center">
            <tr>
              <td className="py-4 text-gray-500">경력 수준</td>
              <td>{hireData.careerLevel ?? '-'}</td>
            </tr>
            <tr>
              <td className="py-4 text-gray-500">고용 형태</td>
              <td>{hireData.employmentType ?? '-'}</td>
            </tr>
            <tr>
              <td className="py-4 text-gray-500">기업명</td>
              <td>{hireData.companyName}</td>
            </tr>
            <tr>
              <td className="py-4 text-gray-500">채용 기간</td>
              <td>{hireData.recruitmentPeriod ?? '-'}</td>
            </tr>
          </tbody>
        </table>

        <Button
          color="green"
          onClick={() => window.open(hireData.jobPostingUrl)}
          className="px-12"
        >
          지원하러 가기
        </Button>
      </Section.Body>
    </Section>
  );
};

export default HireContentSection;
