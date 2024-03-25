import { useState } from 'react';
import Comment from '@components/common/Comment/Comment';
import Section from '@components/common/Section/Section';
import { getPokemonImage } from '@mocks/mocks';
import { useCommentList } from '@hooks/queries/useCommentList';
import CommentInput from '@components/common/CommentInput/CommentInput';
import { useAccusesMutation } from '@hooks/queries/useAccusesMutation';
import useModal from '@hooks/common/useModal';
import { createImageUrl } from '@utils/api';

interface PostCommentSectionProps {
  id: string;
}

const PostCommentSection = ({ id }: PostCommentSectionProps) => {
  const [input, setInput] = useState<string>('');
  const [reInput, setReInput] = useState<string[]>([]);
  const [checkReComment, setCheckReComment] = useState<boolean[]>([false]);

  const { openModal } = useModal();

  const { data } = useCommentList(id);
  const { accusesMutate } = useAccusesMutation();

  const onClickReport = async (commentId: number) => {
    openModal({
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

  const onClickReComment = (commentIndex: number) => {
    setCheckReComment((prevCheckReComment) => {
      const updatedCheckReComment = [...prevCheckReComment];
      updatedCheckReComment[commentIndex] = !prevCheckReComment[commentIndex];
      return updatedCheckReComment;
    });
  };

  const handleInput = (e: string) => {
    setInput(e);
  };

  const handleReInput = (commentIndex: number, value: string) => {
    setReInput((prevReInput) => {
      const updatedReInput = [...prevReInput];
      updatedReInput[commentIndex] = value;
      return updatedReInput;
    });
  };

  return (
    <Section>
      <div className="space-y-4">
        <h3 className="text-lg font-bold">댓글 {data?.items?.length ?? 0}</h3>
        <CommentInput
          id={id}
          value={input}
          onChange={(e) => handleInput(e.target.value)}
        />
        <div className="space-y-4">
          {data?.items?.map(
            ({ id: commentId, writer, writerImageUrl, content, children }) => (
              <div key={commentId} className="space-y-2">
                {/* ROOT */}
                <Comment
                  image={
                    writerImageUrl
                      ? createImageUrl(writerImageUrl)
                      : getPokemonImage()
                  }
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
                          writerImageUrl
                            ? createImageUrl(writerImageUrl)
                            : getPokemonImage()
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
                      onChange={(e) => handleReInput(commentId, e.target.value)}
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
