import InspectionLottie from './InspectionLottie';

export default function Introduce() {
  return (
    <div className="flex w-full flex-col justify-center gap-4 md:flex-row">
      <div className="mt-12 break-keep">
        <h2 className="text-4xl font-bold">
          C-Lab 서비스 상태 페이지에 오신 것을 환영합니다.
        </h2>
        <p className="mt-5 text-xl">
          하단의 정보를 통해 운영중인 서비스의 상태를 확인할 수 있습니다.
        </p>
      </div>
      <InspectionLottie />
    </div>
  );
}
