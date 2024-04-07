import { useCallback, useState } from 'react';
import Comment from '@components/common/Comment/Comment';
import Section from '@components/common/Section/Section';
import { useCommentList } from '@hooks/queries/useCommentList';
import CommentInput from '@components/common/CommentInput/CommentInput';
import { useAccusesMutation } from '@hooks/queries/useAccusesMutation';
import useModal from '@hooks/common/useModal';

interface PostCommentSectionProps {
  id: string;
}

const PostCommentSection = ({ id }: PostCommentSectionProps) => {
  const { data } = useCommentList(id);
  const { accusesMutate } = useAccusesMutation();

  const { openModal } = useModal();
  const [comment, setComment] = useState<string>('');
  const [reComment, setReComment] = useState<string[]>([]);
  const [checkReComment, setCheckReComment] = useState<boolean[]>([false]);

  const handleReportClick = async (commentId: number) => {
    return openModal({
      title: '🚨 신고하기',
      content:
        '댓글에 신고 횟수가 많아지면 운영진이 해당 댓글을 검토합니다.\n정말 해당 댓글을 신고하시겠습니까?',
      accept: {
        text: '신고하기',
        onClick: () => {
          accusesMutate({
            targetType: 'COMMENT',
            targetId: commentId,
            reason: '부적절한 댓글입니다.',
          });
        },
      },
    });
  };

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
                {...rest}
                onClickReport={() => handleReportClick(commentId)}
                onClickReply={() => handleReplyClick(commentId)}
              >
                {content}
              </Comment>
              {/* CHILDREN */}
              <div className="ml-4 space-y-2">
                {children?.map(({ id, content, ...rest }) => (
                  <Comment
                    key={id}
                    onClickReport={() => handleReportClick(id)}
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
