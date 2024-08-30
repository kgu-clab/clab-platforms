import PageLayout from '@/app/PageLayout';

export default function NotificationPage() {
  return (
    <PageLayout nav footer className="max-w-xl space-y-4">
      <div className="space-y-2 text-center">
        <p className="text-xl font-bold">현재 해당 시스템은 개발중이에요</p>
        <p>빠른 시일내로 해당 기능이 추가될 예정이에요. 기대해주세요 🚀</p>
      </div>
    </PageLayout>
  );
}
