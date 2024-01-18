import Image from '@components/common/Image/Image';
import Section from '@components/common/Section/Section';
import { useState } from 'react';

const PostCommentSection = () => {
  const [input, setInput] = useState('');
  const [reInput, setReInput] = useState<string[]>([]);
  const [commentList, setCommentList] = useState<string[]>([]);
  const [reCommentList, setReCommentList] = useState<string[][]>([]);
  const [checkReComment, setCheckReComment] = useState<boolean[]>([false]);

  const onClickReport = () => {
    if (window.confirm('신고하시겠습니까?')) {
      alert('신고가 완료되었습니다.');
    } else {
      alert('취소되었습니다.');
    }
  };
  const onClickReComment = (commentIndex: number) => {
    setCheckReComment((prevCheckReComment) => {
      const updatedCheckReComment = [...prevCheckReComment];
      updatedCheckReComment[commentIndex] = !prevCheckReComment[commentIndex];
      return updatedCheckReComment;
    });
  };
  const sendComment = (comment: string) => {
    if (comment) {
      setCommentList((prevComments) => [...prevComments, comment]);
      setInput('');
    }
    return commentList;
  };
  const sendReComment = (commentIndex: number, comment: string) => {
    const newReCommentList = [...reCommentList];
    newReCommentList[commentIndex] = [
      ...(newReCommentList[commentIndex] || []),
      comment,
    ];
    setReCommentList(newReCommentList);
    setReInput((prevReInput) => {
      const updatedReInput = [...prevReInput];
      updatedReInput[commentIndex] = '';
      return updatedReInput;
    });
  };
  const inputChange = (e: string) => {
    setInput(e);
  };

  const reInputChange = (commentIndex: number, value: string) => {
    const newReInput = [...reInput];
    newReInput[commentIndex] = value;
    setReInput(newReInput);
  };

  return (
    <Section>
      <div className="m-4 space-y-4">
        <p className="text-lg font-bold">댓글 {commentList.length}</p>

        <div>
          <textarea
            className="border p-2 w-full"
            placeholder="댓글을 입력해주세요."
            value={input}
            onChange={(e) => inputChange(e.target.value)}
          />

          <div className="space-x-1">
            <button
              className="rounded-md border-2 p-2 text-xs bg-gray-100 hover:bg-gray-300"
              onClick={() => setInput('')}
            >
              취소
            </button>
            <button
              className="rounded-md border-2 p-2 text-xs bg-gray-100 hover:bg-gray-300"
              onClick={() => sendComment(input)}
            >
              등록
            </button>
          </div>
        </div>
        {/* 댓글 세부 */}
        <div>
          {commentList.map((comment, index) => (
            <div className="flex border-b py-2" key={index}>
              <Image
                className="rounded-full"
                width={10}
                height={10}
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww"
                alt="profile"
              />
              <div className="pl-2">
                <div className="pb-2">
                  <p className="text-sm font-bold">김정은</p>
                  {comment}
                  <p className="text-xs text-gray-500">2023-11-22</p>
                  <button
                    className="rounded-md border-2 p-1 text-xs hover:bg-gray-200"
                    onClick={onClickReport}
                  >
                    신고
                  </button>
                  <button
                    className="rounded-md border-2 p-1 text-xs hover:bg-gray-200"
                    onClick={() => onClickReComment(index)}
                  >
                    댓글
                  </button>
                </div>

                {/* 대댓글 세부 */}
                <div>
                  {reCommentList[index] &&
                    reCommentList[index].map((comment, reIndex) => (
                      <div className="py-4" key={reIndex}>
                        <p className="text-sm">
                          <span className="font-bold">김정은 </span>| {comment}
                        </p>
                        <p className="text-xs text-gray-500">2023-11-22</p>
                      </div>
                    ))}
                  {/* 대댓글 입력창 */}
                  {checkReComment[index] && (
                    <div>
                      <textarea
                        className="border p-2 w-full"
                        placeholder="댓글을 입력해주세요."
                        value={reInput[index] || ''}
                        onChange={(e) => reInputChange(index, e.target.value)}
                      ></textarea>

                      <button
                        className="w-10 rounded-md border-2 p-1 text-xs hover:bg-gray-200"
                        onClick={() => sendReComment(index, reInput[index])}
                      >
                        등록
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default PostCommentSection;
