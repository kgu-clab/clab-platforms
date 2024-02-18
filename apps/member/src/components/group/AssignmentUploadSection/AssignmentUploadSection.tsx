import { useEffect, useRef, useState } from 'react';
import { Button, Input } from '@clab/design-system';
import Header from '@components/common/Header/Header';
import Section from '@components/common/Section/Section';
import dayjs from 'dayjs';
import type { ActivityBoardType } from '@type/activity';
import { useUploadedFileAssignmentMutaion } from '@hooks/queries/useUploadedFileAssignmentMutaion';
import { useMyProfile } from '@hooks/queries/useMyProfile';

interface AssignmentUploadSectionProps {
  id: number;
  activityGroupId: number;
  groupName: string;
  weeklyActivities: ActivityBoardType;
  mySubmit: ActivityBoardType;
}

const AssignmentUploadSection = ({
  id,
  activityGroupId,
  groupName,
  weeklyActivities,
  mySubmit,
}: AssignmentUploadSectionProps) => {
  const changeSubmitFileUploader = useRef<HTMLInputElement>(null);
  const submitFileUploader = useRef<HTMLInputElement>(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const { uploadedFileAssignmentMutate } = useUploadedFileAssignmentMutaion();
  const { data: myProfile } = useMyProfile();
  const [lastModifiedDate, setLastModifiedDate] = useState(
    dayjs(mySubmit.createdAt).format('YYYY-MM-DD HH:mm'),
  );
  useEffect(() => {
    // 제출되지 않았을 경우 남은 기간 계산
    if (mySubmit.files?.length === 0) {
      const deadlineDate = dayjs(
        weeklyActivities.dueDateTime,
        'YYYY-MM-DD HH:mm',
      );
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
  }, []);

  const handleFileSubmit = () => {
    if (submitFileUploader.current?.files?.length) {
      const selectedFile = submitFileUploader.current?.files[0];
      console.log(selectedFile);
      if (selectedFile) {
        const formData = new FormData();
        formData.append(
          'multipartFile',
          selectedFile,
          encodeURIComponent(selectedFile.name),
        );
        console.log(formData);
        uploadedFileAssignmentMutate({
          body: {
            activityGroupId: activityGroupId,
            activityGroupBoard: id,
            memberId: myProfile.id,
            storagePeriod: 7,
          },
          multipartFile: formData,
          change: false,
        });
      }
      const now = new Date();
      const localTime = now.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
      setLastModifiedDate(localTime);
    }
  };

  const handleFileChange = () => {
    if (changeSubmitFileUploader.current?.files?.length) {
      const selectedFile = changeSubmitFileUploader.current?.files[0];
      console.log(selectedFile);
      if (selectedFile) {
        const formData = new FormData();
        formData.append(
          'multipartFile',
          selectedFile,
          encodeURIComponent(selectedFile.name),
        );
        console.log(formData);

        uploadedFileAssignmentMutate({
          body: {
            activityGroupId: activityGroupId,
            activityGroupBoard: id,
            memberId: myProfile.id,
            storagePeriod: 7,
          },
          multipartFile: formData,
          change: true,
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      {weeklyActivities.title && (
        <Header title={['활동', groupName, weeklyActivities.title]} />
      )}
      <Section>
        <Section.Header title="과제 설명" />
        <p className="pt-3">{weeklyActivities?.content}</p>
      </Section>
      <Section>
        <Section.Header title="제출 상황" />
        <table className="table mb-4 m-2 w-full table-fixed bg-white">
          <tbody>
            <tr className="border-b">
              <td className="p-2">과제 제출 여부</td>
              <td className="p-2">
                {mySubmit.files === undefined ? '미제출' : '제출 완료'}
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2">종료 일시</td>
              <td className="p-2">
                {dayjs(weeklyActivities.dueDateTime).format('YYYY-MM-DD HH:mm')}
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2">최종 수정 일시</td>
              <td className="p-2">
                {mySubmit.files === undefined
                  ? timeRemaining
                  : lastModifiedDate}
              </td>
            </tr>
            <tr>
              <td className="p-2">첨부 파일</td>
              <td className="p-2">
                {mySubmit.files !== undefined ? (
                  <div className="flex flex-col space-y-2">
                    {mySubmit.files?.map(({ originalFileName }, id) => (
                      <li key={id}>{originalFileName}</li>
                    ))}
                    <Button
                      className="w-fit"
                      onClick={() => changeSubmitFileUploader.current?.click()}
                    >
                      파일 변경하기
                    </Button>
                    <Input
                      id="submitFileChange"
                      type="file"
                      ref={changeSubmitFileUploader}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <Button onClick={() => submitFileUploader.current?.click()}>
                    <Input
                      id="submitFileChange"
                      type="file"
                      ref={submitFileUploader}
                      style={{ display: 'none' }}
                      onChange={handleFileSubmit}
                    />
                    파일 업로드하기
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
