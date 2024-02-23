import type {
  ActivityBoardType,
  ActivityBoardWithAssignmentType,
} from '@type/activity';

export const setGroupFilter = (data: Array<ActivityBoardType>) => {
  const notices = [] as Array<ActivityBoardType>;
  const activities = [] as Array<ActivityBoardType>;
  const assignments = [] as Array<ActivityBoardType>;

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
        // 부모 ID를 찾아서 해당 주차에 추가
        parent = activities.find((activity) => activity.id === board.parentId);
        if (parent) {
          parent.assignments = parent?.assignments || [];
          parent.assignments.push(board);
        }
        assignments.push(board);
        break;
    }
  });

  return [notices, activities, assignments];
};
