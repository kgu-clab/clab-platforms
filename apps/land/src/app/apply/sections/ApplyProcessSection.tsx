const ApplyProcess = [
  {
    title: '지원서 접수',
    content: '양식에 맞춰 지원서를 작성해주세요.',
  },
  {
    title: '서류 전형',
    content: '서류 전형을 통해 1차 합격자를 선발해요.',
  },
  {
    title: '면접 진행',
    content: '서류를 바탕으로 면접을 진행해요.',
  },
  {
    title: '합격 발표',
    content: '면접을 통해 선발된 최종 합격자를 발표해요.',
  },
];

export default function ApplyProcessSection() {
  return (
    <div className="flex h-fit w-screen flex-col items-center justify-center overflow-x-hidden break-keep py-32">
      <p className="mb-12 text-3xl font-bold">지원 절차</p>
      <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-4 md:gap-8">
        {ApplyProcess.map(({ title, content }, index) => (
          <div
            key={index}
            className="bg-clab-gray flex h-52 w-60 flex-col justify-between rounded-lg p-6 text-left md:h-60 md:py-8"
          >
            <p className="mb-4 text-2xl font-bold">{index + 1}</p>
            <div>
              <p className="mb-2 text-2xl font-bold">{title}</p>
              <p className="text-sm">{content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
