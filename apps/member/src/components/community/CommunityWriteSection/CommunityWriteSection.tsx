import Section from '@components/common/Section/Section';
import { useState } from 'react';

const CommunityWriteSection = () => {
  const [sort, setSort] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onClickUpload = () => {
    if (sort && title && content) {
      alert('게시 완료되었습니다.');
    } else alert('모든 입력 사항을 기입해주세요.');
  };

  return (
    <Section>
      <div className="flex gap-4">
        <div className="flex-grow-0">
          <select
            className="border p-2 rounded-md w-full"
            name="sort"
            value={sort}
            defaultValue=""
            onChange={(e) => setSort(e.target.value)}
          >
            <option disabled value="">
              분류
            </option>
            <option>공지사항</option>
            <option>자유</option>
            <option>QnA</option>
            <option>졸업생 게시판</option>
          </select>
        </div>
        <div className="flex-grow">
          <input
            name="title"
            type="text"
            placeholder="제목을 입력해주세요"
            className="border p-2 rounded-md w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <textarea
        name="content"
        className="border p-2 rounded-md mt-4 h-80 w-full mb-4"
        placeholder="내용을 입력해주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        className="border bg-gray-200 p-2 hover:bg-gray-300"
        onClick={() => onClickUpload()}
      >
        등록
      </button>
    </Section>
  );
};

export default CommunityWriteSection;
