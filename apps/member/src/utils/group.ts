import type {
  ActivityBoardType,
  ActivityBoardWithAssignmentType,
} from '@type/activity';

/**
 * 입력된 데이터 배열을 분류하여 공지사항, 활동, 과제로 나눕니다.
 * 각각의 카테고리는 별도의 배열에 저장되며, 과제는 해당하는 활동(주차)에도 추가됩니다.
 *
 * @param {Array<ActivityBoardType>} data - 분류할 데이터 배열. 각 요소는 ActivityBoardType 타입을 따릅니다.
 * @returns {ActivityGroupBoardParserType} 분류된 데이터를 담고 있는 객체를 반환합니다. 반환되는 객체는 `notices`, `activities`, `assignments`의 세 가지 프로퍼티를 가집니다.
 * - `notices`: 공지사항을 담고 있는 배열입니다.
 * - `activities`: 활동(주차별 정보)을 담고 있는 배열입니다. 각 활동 정보는 `assignments` 배열도 포함할 수 있습니다.
 * - `assignments`: 과제를 담고 있는 배열입니다. 과제는 관련 활동에도 추가됩니다.
 */
export const groupBoardParser = (data: Array<ActivityBoardType>) => {
  const notices: Array<ActivityBoardType> = [];
  const activities: Array<ActivityBoardType> = [];
  const assignments: Array<ActivityBoardType> = [];

  data.reverse().forEach((board) => {
    let parent: ActivityBoardWithAssignmentType | undefined;
    switch (board.category) {
      case 'NOTICE':
        notices.push(board);
        break;
      case 'WEEKLY_ACTIVITY':
        activities.push(board);
        break;
      case 'ASSIGNMENT':
        assignments.push(board);
        // 부모 ID를 찾아서 해당 주차에 추가
        parent = activities.find((activity) => activity.id === board.parentId);
        if (parent) {
          parent.assignments = parent?.assignments || []; // 기존 Assignment가 없을 경우 초기화
          parent.assignments.push(board);
        }
        break;
    }
  });

  return {
    notices: notices,
    activities: activities,
    assignments: assignments,
  };
};
