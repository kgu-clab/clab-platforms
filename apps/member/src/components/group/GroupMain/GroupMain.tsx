import Section from '@components/common/Section/Section';
import GroupCard from '@components/group/GroupCard/GroupCard';
import groupList from '@mocks/data/groupList.json';

const GroupMain = () => {
  const groupCount = groupList?.length || 0;

  return (
    <Section>
      <Section.Header title={`현재 진행중인 그룹 ${groupCount}`} />
      <Section.Body className="space-y-4">
        {groupList.map(({ id, ...props }) => (
          <GroupCard key={id} id={id} {...props} />
        ))}
      </Section.Body>
    </Section>
  );
};

export default GroupMain;
