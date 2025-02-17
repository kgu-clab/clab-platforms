export default function ResultFail() {
  return (
    <div className="flex flex-col gap-4 break-keep">
      <p>아쉽게도 모집 인원으로 함께 할 수 없게 되었습니다.</p>
      <p>
        <b>최종 결과 발표일 이전</b>일 경우 혹은, 입력 정보가{' '}
        <b>한 글자라도 틀릴 경우</b> 다른 결과가 보이기 때문에 한 번 더
        확인하시기 바랍니다.
      </p>
      <p>
        입력 칸에 <b>문자 혹은 공백</b>이 있을 경우 조회가 안됩니다.
      </p>
      <p>추가적인 문의사항 있으시면 연락바랍니다.</p>
    </div>
  );
}
