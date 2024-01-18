interface PostTextSectionProps {
  contents: string;
}

const PostTextSection = ({ contents }: PostTextSectionProps) => {
  const onClickEdit = () => {};
  const onClickReport = () => {
    if (window.confirm('신고하시겠습니까?')) {
      alert('신고가 완료되었습니다.');
    } else {
      alert('취소되었습니다.');
    }
  };

  return (
    <div className="space-y-4 p-4">
      <hr />
      <div className="pb-4">{contents}</div>
      <button
        className="rounded-md border-2 p-1 text-xs hover:bg-gray-200"
        onClick={onClickReport}
      >
        신고
      </button>
      <button
        className="rounded-md border-2 p-1 text-xs hover:bg-gray-200"
        onClick={onClickEdit}
      >
        수정
      </button>
    </div>
  );
};

export default PostTextSection;
