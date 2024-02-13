import { useState } from 'react';
import Comment from '@components/common/Comment/Comment';
import Section from '@components/common/Section/Section';
import { getPokemonImage } from '@mocks/mocks';
import { useCommentList } from '@hooks/queries/useCommentList';
import CommentInput from '@components/common/CommentInput/CommentInput';
import { useAccuses } from '@hooks/queries/useAccuses';

interface PostCommentSectionProps {
  id: number;
}

const PostCommentSection = ({ id }: PostCommentSectionProps) => {
  const [input, setInput] = useState<string>('');
  const [reInput, setReInput] = useState<string[]>([]);
  const [checkReComment, setCheckReComment] = useState<boolean[]>([false]);
  const { data: commentData } = useCommentList(id, 0, 20);
  const { accusesData } = useAccuses();

  const onClickReport = (commentId: number) => {
    const info = {
      targetType: 'COMMENT',
      targetId: commentId,
      reason: '부적절한 댓글입니다.',
    };
    if (window.confirm('신고하시겠습니까?')) {
      accusesData(info);
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
  const inputChange = (e: string) => {
    setInput(e);
  };

  const reInputChange = (commentIndex: number, value: string) => {
    setReInput((prevReInput) => {
      const updatedReInput = [...prevReInput];
      updatedReInput[commentIndex] = value;
      return updatedReInput;
    });
  };

  return (
    <Section>
      <div className="space-y-4">
        <h3 className="text-lg font-bold">
          댓글 {commentData?.items?.length ?? 0}
        </h3>
        <CommentInput
          id={id}
          value={input}
          onChange={(e) => inputChange(e.target.value)}
        />
        <div className="space-y-4">
          {commentData?.items?.map(
            ({ id: commentId, writer, writerImageUrl, content, children }) => (
              <div key={commentId} className="space-y-2">
                {/* ROOT */}
                <Comment
                  image={writerImageUrl ? writerImageUrl : getPokemonImage()}
                  writer={writer}
                  onClickReport={() => onClickReport(commentId)}
                  onClickReply={() => onClickReComment(commentId)}
                >
                  {content}
                </Comment>
                {/* CHILDREN */}
                <div className="ml-5 space-y-2">
                  {children?.map(
                    ({ id: replyId, writer, writerImageUrl, content }) => (
                      <Comment
                        key={replyId}
                        image={
                          writerImageUrl ? writerImageUrl : getPokemonImage()
                        }
                        isReply
                        writer={writer}
                        onClickReport={() => onClickReport(replyId)}
                        onClickReply={() => onClickReComment(replyId)}
                      >
                        {content}
                      </Comment>
                    ),
                  )}
                  {/* Reply Input */}
                  {checkReComment[commentId] && (
                    <CommentInput
                      id={id}
                      parentId={commentId}
                      value={reInput[commentId] || ''}
                      onChange={(e) => reInputChange(commentId, e.target.value)}
                    />
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </Section>
  );
};

export default PostCommentSection;
