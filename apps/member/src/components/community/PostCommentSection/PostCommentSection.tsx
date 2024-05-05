import { useCallback, useState } from 'react';

import Comment from '@components/common/Comment/Comment';
import CommentInput from '@components/common/CommentInput/CommentInput';
import Section from '@components/common/Section/Section';

import { useComments } from '@hooks/queries';

interface PostCommentSectionProps {
  id: number;
}

const PostCommentSection = ({ id }: PostCommentSectionProps) => {
  const { data } = useComments(id);

  const [comment, setComment] = useState<string>('');
  const [reComment, setReComment] = useState<string[]>([]);
  const [checkReComment, setCheckReComment] = useState<boolean[]>([false]);

  const handleCommentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
    },
    [],
  );

  const handleReplyClick = (commentIndex: number) => {
    setCheckReComment((prevCheckReComment) => {
      const updatedCheckReComment = [...prevCheckReComment];
      updatedCheckReComment[commentIndex] = !prevCheckReComment[commentIndex];
      return updatedCheckReComment;
    });
  };

  const handleReCommentChange = useCallback(
    (commentIndex: number, value: string) => {
      setReComment((prevReInput) => {
        const updatedReInput = [...prevReInput];
        updatedReInput[commentIndex] = value;
        return updatedReInput;
      });
    },
    [],
  );

  return (
    <Section>
      <h3 className="text-lg font-bold">댓글 {data.items?.length ?? 0}</h3>
      <Section.Body>
        <CommentInput id={id} value={comment} onChange={handleCommentChange} />
        <div className="divide-y">
          {data.items.map(({ id: commentId, content, children, ...rest }) => (
            <div key={commentId} className="p-3">
              {/* ROOT */}
              <Comment
                id={commentId}
                onClickReply={() => handleReplyClick(commentId)}
                {...rest}
              >
                {content}
              </Comment>
              {/* CHILDREN */}
              <div className="ml-4 space-y-2">
                {children?.map(({ id, content, ...rest }) => (
                  <Comment
                    key={id}
                    id={id}
                    onClickReply={() => handleReplyClick(id)}
                    isReply
                    {...rest}
                  >
                    {content}
                  </Comment>
                ))}
                {/* Reply */}
                {checkReComment[commentId] && (
                  <CommentInput
                    id={id}
                    parentId={commentId}
                    value={reComment[commentId] || ''}
                    onChange={(e) =>
                      handleReCommentChange(commentId, e.target.value)
                    }
                    className="mt-2 border-l pl-4"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </Section.Body>
    </Section>
  );
};

export default PostCommentSection;
