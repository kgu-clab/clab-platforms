import Pagination from '@components/common/Pagination/Pagination';
import Section from '@components/common/Section/Section';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PaginationProps {
  sort?: string;
  data: {
    id: number;
    type?: string;
    title: string;
    writer?: string;
    createAt: string;
  }[];
}
const DetailList = ({ sort, data }: PaginationProps) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 20;
  const offset = (page - 1) * limit;

  const onClickTitle = (id: number) => {
    navigate(`/communityPost/${sort}/${id}`, {
      state: { sort: sort, id: id },
    });
  };
  console.log(sort);
  return (
    <Section>
      <p className="flex justify-between pb-8 pl-4 text-lg">
        <div>
          총 <span className="font-bold text-pink-600">{data.length}</span>
          개의 게시글이 있어요
        </div>
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          className="border p-2 h-8 w-full max-w-xs"
        />
      </p>
      <table className="w-full">
        <thead className="border-b">
          <tr className="text-lg">
            <th className="">번호</th>
            <th className="">제목</th>
            <th className="">작성자</th>
            <th className="">작성일</th>
          </tr>
        </thead>
        {data
          .slice(offset, offset + limit)
          .map(({ id, title, writer, createAt }) => (
            <tbody key={id}>
              <tr className="mb-2 items-center rounded p-1 transition hover:bg-gray-100 hover:font-medium">
                <td className="text-center">{id}</td>
                <td className="flex" onClick={() => onClickTitle(id)}>
                  {title}
                  <div className="pl-2">
                    <div className="border border-sky-500 m-1 rounded-xl text-sky-500 text-xs px-1">
                      new!
                    </div>
                  </div>
                </td>
                <td className="text-center">{writer}</td>
                <td className="text-center">{createAt}</td>
              </tr>
            </tbody>
          ))}
      </table>
      <div className="flex justify-center pt-2">
        <Pagination
          totalItems={data.length}
          pageLimit={5}
          postLimit={limit}
          setPage={setPage}
          page={page}
          sort={sort}
        />
      </div>
    </Section>
  );
};

export default DetailList;
