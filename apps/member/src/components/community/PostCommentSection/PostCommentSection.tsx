import { useState } from 'react';
import Comment from '@components/common/Comment/Comment';
import CommentInput from '@components/common/CommentInput/CommentInput';
import Section from '@components/common/Section/Section';
import { getPokemonImage } from '@mocks/mocks';

const PostCommentSection = () => {
  const [input, setInput] = useState<string>('');
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
    onClickReComment(commentIndex);
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
      <div className="space-y-4">
        <h3 className="text-lg font-bold">댓글 {commentList.length}</h3>
        <CommentInput
          value={input}
          onChange={(e) => inputChange(e.target.value)}
          onClick={() => sendComment(input)}
        />
        <div className="space-y-4">
          {commentList.map((comment, index) => (
            <div key={index} className="space-y-2">
              {/* ROOT */}
              <Comment
                image={getPokemonImage()}
                writer="김관식 (201912023)"
                onClickReport={onClickReport}
                onClickReply={() => onClickReComment(index)}
              >
                {comment}
              </Comment>
              {/* CHILDREN */}
              <div className="ml-5 space-y-2">
                {reCommentList[index] &&
                  reCommentList[index].map((comment, index) => (
                    <Comment
                      image={getPokemonImage()}
                      isReply
                      writer="김관식 (201912023)"
                      onClickReport={onClickReport}
                      onClickReply={() => onClickReComment(index)}
                    >
                      {comment}
                    </Comment>
                  ))}
                {/* Reply Input */}
                {checkReComment[index] && (
                  <CommentInput
                    value={reInput[index]}
                    onChange={(e) => reInputChange(index, e.target.value)}
                    onClick={() => sendReComment(index, reInput[index])}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default PostCommentSection;
