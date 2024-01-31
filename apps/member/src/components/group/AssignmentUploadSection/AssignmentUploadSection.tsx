import { useEffect, useState } from 'react';
import { Button } from '@clab/design-system';
import Header from '@components/common/Header/Header';
import Section from '@components/common/Section/Section';
import dayjs from 'dayjs';

interface assignmentData {
  id: number;
  title: string;
  content: string;
  deadline: string;
}
interface AssignmentUploadSectionProps {
  week: number;
  id: number;
  activityId: number;
  name: string;
  weeklyActivities: {
    week: number;
    content: string;
    assignments: assignmentData[];
  }[];
}

const AssignmentUploadSection = ({
  week,
  id,
  activityId,
  name,
  weeklyActivities,
}: AssignmentUploadSectionProps) => {
  const [file, setFile] = useState<File>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastModifiedDate, setLastModifiedDate] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');
  const [assignment, setAssignment] = useState<assignmentData>();

  useEffect(() => {
    // weeklyActivities에서 해당 week의 데이터를 찾기
    const weekData = weeklyActivities.find((w) => w.week === week);
    if (weekData) {
      // 과제 ID에 해당하는 과제 찾기
      const assignmentData: assignmentData | undefined =
        weekData.assignments.find((a) => a.id === activityId);
      if (assignmentData) {
        setAssignment(assignmentData);
      }
    }
  }, [week, id, weeklyActivities, activityId]);

  useEffect(() => {
    // 제출되지 않았을 경우 남은 기간 계산
    if (!isSubmitted && assignment) {
      const deadlineDate = dayjs(assignment.deadline, 'YYYY-MM-DD HH:mm');
      const today = dayjs();
      const timeDiff = deadlineDate.diff(today, 'millisecond');

      // 남은 시간이 음수인 경우 기한이 지난 것으로 처리
      if (timeDiff > 0) {
        // 남은 일수 계산
        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        setTimeRemaining(`${daysRemaining}일 남음`);
      } else {
        setTimeRemaining('기한이 지났습니다');
      }
    }
  }, [assignment, isSubmitted]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile); // 파일 상태 업데이트

    // 파일이 선택되었다면 제출 상태를 false로 설정
    if (selectedFile) {
      setIsSubmitted(false);
    }
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setIsSubmitted(true);

    const now = new Date();
    const localTime = now.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    setLastModifiedDate(localTime);
  };

  return (
    <div className="space-y-4">
      <Header title={['활동', name, assignment ? assignment.title : '']} />
      <Section>
        <Section.Header title="과제 설명" />
        <p className="pt-3">{assignment?.content}</p>
      </Section>
      <Section>
        <Section.Header title="제출 상황" />
        <table className="table mb-4 m-2 w-full table-fixed bg-white">
          <tbody>
            <tr className="border-b">
              <td className="p-2">과제 제출 여부</td>
              <td className="p-2">{isSubmitted ? '제출됨' : '미제출'}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">종료 일시</td>
              <td className="p-2">{assignment ? assignment.deadline : ''}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">최종 수정 일시</td>
              <td className="p-2">
                {isSubmitted ? lastModifiedDate : timeRemaining}
              </td>
            </tr>
            <tr>
              <td className="p-2">첨부 파일</td>
              <td className="p-2">
                <Button onClick={() => handleSubmit}>
                  {file ? file.name : '파일을 선택해주세요.'}
                </Button>
                {file && (
                  <Button onClick={() => handleFileChange}>
                    파일 수정하기
                  </Button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  );
};

export default AssignmentUploadSection;
