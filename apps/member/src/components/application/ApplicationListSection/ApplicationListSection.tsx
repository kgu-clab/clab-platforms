import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Badge, Button, Table } from '@clab-platforms/design-system';

import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';
import Select from '@components/common/Select/Select';

import { TABLE_HEAD } from '@constants/head';
import useModal from '@hooks/common/useModal';
import { usePagination } from '@hooks/common/usePagination';
import {
  useApplicationAllMemberMutation,
  useApplicationConditions,
  useApplicationMemberMutation,
  useApplicationNonePassMutation,
  useApplicationPassMutation,
} from '@hooks/queries/application';

import type { ApplicationMemberType } from '@type/application';

import { ApplicationInfoModal } from './ApplicationInfoModal';

interface RecruitmentItem {
  id: number;
  value: number;
  name: string;
}

interface ApplicationListSectionProps {
  recruitmentList: RecruitmentItem[];
}

const ApplicationListSection = ({
  recruitmentList,
}: ApplicationListSectionProps) => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [selectRecruitment, setSelectRecruitment] = useState<number>(
    recruitmentList.length, // 가장 최신의 모집공고
  );
  const { page, size, handlePageChange } = usePagination();
  const { data } = useApplicationConditions({
    recruitmentId: selectRecruitment,
    page,
    size,
  });
  const { applicationMemberMutate } = useApplicationMemberMutation();
  const { applicationAllMemberMutate } = useApplicationAllMemberMutation();
  const { applicationNonePassMutate } = useApplicationNonePassMutation();
  const { applicationPassMutate } = useApplicationPassMutation();

  useEffect(() => {
    navigate('');
  }, [selectRecruitment]);

  const handleRecruitmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectRecruitment(+e.target.value);
  };
  const handlePassButtonClick = (recruitmentId: number, studentId: string) => {
    applicationPassMutate({ recruitmentId, studentId });
  };
  const handleNonePassButton = (recruitmentId: number, studentId: string) => {
    applicationNonePassMutate({ recruitmentId, studentId });
  };
  const handleCreateMemberButton = (
    recruitmentId: number,
    studentId: string,
  ) => {
    applicationMemberMutate({ recruitmentId, studentId });
  };
  const handleCreateAllMemberButton = () => {
    applicationAllMemberMutate(selectRecruitment);
  };
  const handleViewButtonClick = (info: ApplicationMemberType) => {
    return openModal({
      title: '지원서',
      content: <ApplicationInfoModal applicationInfo={info} />,
    });
  };

  return (
    <Section>
      <Section.Header
        title="지원자 목록"
        description="지원자 목록을 조회하고 지원자 처리를 진행해요"
      />
      <Section.Body className="space-y-4">
        <div className="flex gap-8">
          <Select
            options={recruitmentList}
            label="모집 공고"
            onChange={handleRecruitmentChange}
            className="h-fit w-full"
          />
          <Button
            size="sm"
            onClick={handleCreateAllMemberButton}
            className="mt-auto flex h-fit align-bottom"
          >
            합격자 계정 일괄 생성
          </Button>
        </div>
        <Table head={TABLE_HEAD.APPLY_TABLE}>
          {data.items.map((application, index) => (
            <Table.Row key={application.studentId}>
              <Table.Cell>{index + 1 + page * 20}</Table.Cell>
              <Table.Cell>{application.name}</Table.Cell>
              <Table.Cell>{application.studentId}</Table.Cell>
              <Table.Cell>
                <Button
                  size="sm"
                  onClick={() => handleViewButtonClick(application)}
                >
                  보기
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Badge color={application.isPass ? 'blue' : 'red'}>
                  {application.isPass ? '합격' : '불합격'}
                </Badge>
              </Table.Cell>
              <Table.Cell className="space-x-2">
                <Button
                  size="sm"
                  color="blue"
                  onClick={() =>
                    handlePassButtonClick(
                      selectRecruitment,
                      application.studentId,
                    )
                  }
                >
                  합격
                </Button>
                <Button
                  size="sm"
                  color="red"
                  onClick={() =>
                    handleNonePassButton(
                      selectRecruitment,
                      application.studentId,
                    )
                  }
                >
                  불합격
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  color="green"
                  size="sm"
                  onClick={() =>
                    handleCreateMemberButton(
                      selectRecruitment,
                      application.studentId,
                    )
                  }
                >
                  계정 생성하기
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
        <Pagination
          className="mt-4 justify-center"
          totalItems={data.totalItems}
          postLimit={size}
          onChange={handlePageChange}
          page={page}
        />
      </Section.Body>
    </Section>
  );
};

export default ApplicationListSection;
