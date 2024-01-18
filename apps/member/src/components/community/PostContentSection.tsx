import Image from '@components/common/Image/Image';
import Section from '@components/common/Section/Section';

interface PostContentSectionProps {
  id?: string;
  sort?: string;
  data: {
    title: string;
    writer?: string;
    createAt: string;
    contents: string;
  }[];
}

const PostContentSection = ({ id, sort, data }: PostContentSectionProps) => {
  const onClickEdit = () => {};
  const onClickReport = () => {
    if (window.confirm('신고하시겠습니까?')) {
      alert('신고가 완료되었습니다.');
    } else {
      alert('취소되었습니다.');
    }
  };
  return (
    <Section>
      <div className="m-4 space-y-4">
        {data[Number(id) - 1] ? (
          <>
            <h1 className="text-3xl">{data[Number(id) - 1].title}</h1>
            <div className="flex">
              {sort != 'hire' && (
                <Image
                  className="rounded-full"
                  width={10}
                  height={10}
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww"
                  alt="profile"
                />
              )}
              <div className="ml-2 text-sm">
                <p className="font-bold">{data[Number(id) - 1].writer}</p>
                <p>{data[Number(id) - 1].createAt}</p>
              </div>
            </div>
            <hr />
            <div className="pb-4">{data[Number(id) - 1].contents}</div>
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
          </>
        ) : (
          <p>게시물이 존재하지 않습니다.</p>
        )}
      </div>
    </Section>
  );
};

export default PostContentSection;
