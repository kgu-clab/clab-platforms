import Section from '@components/common/Section/Section';
import { useMembershipFeeMutation } from '@hooks/queries/useMembershipFeeMutation';
import { FORM_DATA_KEY } from '@constants/api';
import SupportRequestForm from '../SupportRequestForm/SupportRequestForm';
import Linker from '@components/common/Linker/Linker';
import { PATH } from '@constants/path';
import type { SupportRequestDataType } from '@type/support';

const SupportRequestSection = () => {
  const { membershipFeeMutate, isPending } = useMembershipFeeMutation();
  /**
   * 사용 신청서를 제출합니다.
   */
  const handleRequestSubmit = async (data: SupportRequestDataType) => {
    const formData = new FormData();
    if (data.file) {
      formData.append(
        FORM_DATA_KEY,
        data.file,
        encodeURIComponent(data.file.name),
      );
    }
    membershipFeeMutate({
      body: data,
      multipartFile: formData.get(FORM_DATA_KEY) ? formData : null,
    });
  };

  return (
    <Section>
      <Section.Header title="사용 신청서" />
      <Linker to={PATH.LIBRARY}>
        혹시 도서 신청을 하시나요? 이미 보유중인 책일 수도 있어요.
      </Linker>
      <hr className="mt-4 border border-dashed" />
      <Section.Body>
        <SupportRequestForm
          isPending={isPending}
          onSubmit={handleRequestSubmit}
        />
      </Section.Body>
    </Section>
  );
};

export default SupportRequestSection;
