'use client';

import { Button } from '@clab-platforms/design-system';

import { MAX_SIZE, MODAL_KEY } from '@/shared/constants';
import { useModalAction, useModalState } from '@/shared/hooks';
import { Modal } from '@/shared/ui';
import { useTimeTableParams } from '@/widgets/time-table/model';
import { useRouter } from 'next/navigation';

interface TimeTableLectureRemoveModalProps {
  selectedLectureId: number;
}

export default function TimeTableLectureRemoveModal({
  selectedLectureId,
}: TimeTableLectureRemoveModalProps) {
  const { searchParamsAction } = useTimeTableParams();
  const { close } = useModalAction({ key: MODAL_KEY.lectureRemove });
  const visible = useModalState({ key: MODAL_KEY.lectureRemove }).visible;
  const router = useRouter();

  const handleLectureRemoveButton = () => {
    const idList = searchParamsAction
      .getAll('id')
      .filter((id) => id !== String(selectedLectureId));

    searchParamsAction.remove('id');

    idList.forEach((id) => {
      searchParamsAction.append('id', id);
    });

    router.push(`/timetable?${searchParamsAction.getParams()}`, {
      scroll: false,
    });
    close();
  };

  return (
    <>
      {visible && (
        <Modal size={MAX_SIZE.md} title="강의 삭제" close={close}>
          <Modal.Content>
            <div className="flex w-full flex-col gap-y-12">
              <p>강의를 삭제하시겠어요?</p>
              <div className="flex w-full justify-end gap-x-2">
                <Button
                  color="blue"
                  className="px-4"
                  onClick={handleLectureRemoveButton}
                >
                  확인
                </Button>
                <Button color="primary" className="px-4" onClick={close}>
                  취소
                </Button>
              </div>
            </div>
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}
