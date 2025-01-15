import { TABLE_HEADERS } from '@/widgets/sugang/model';

/* TABLE_HEADERS의 Key 타입(wishList, lectureList, registrationList)
 * 이 세 타입을 통해서 필요에 따라 하나의 TableView 컴포넌트를 바탕으로 내부에 띄울 표의 내용을 다르게 합니다. */
export type TableNameKey = keyof typeof TABLE_HEADERS;

/* TableNameKey를 통해서 가져오는 각 모드 당 테이블 헤더입니다.
 * 소망가방, 과목리스트, 수강신청리스트 각각 표에 표시되는 헤더 항목입니다. */
export type TableNameValue<T extends TableNameKey> =
  (typeof TABLE_HEADERS)[T][number];

/* TableNameValue(모드 당 테이블 헤더)를 Key로 가지고 이 항목에 대한 값들의 타입입니다.
 * 현재는 string과 number뿐이라 이렇게 해 놓았는데, 차후에 버튼 추가 시 변경 예정입니다. */
export type TableData<T extends TableNameKey> = {
  [key in TableNameValue<T>]: string | number;
};
