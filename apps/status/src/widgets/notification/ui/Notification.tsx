import Title from '@/src/shared/ui/Title';

import NotificationItem from './NotificationItem';

export default function Notification() {
  return (
    <div className="w-full">
      <Title text="서비스 공지" />
      <ul className="mt-7">
        <NotificationItem
          date={new Date()}
          title="멤버스 점검"
          description="멤버스 임시 점검 예정입니다"
        />
      </ul>
    </div>
  );
}
