import { MdOutlineImage } from "react-icons/md";
import { MdHowToVote } from "react-icons/md";
import { Button } from "@/components/common";

interface CommunityWriteBottomBarProps {
  onImageClick?: () => void;
  onVoteClick?: () => void;
  onSubmit?: () => void;
  disabled?: boolean;
}

export default function CommunityWriteBottomBar({
  onImageClick,
  onVoteClick,
  onSubmit,
  disabled = false,
}: CommunityWriteBottomBarProps) {
  return (
    <div className="border-gray-2 gap-lg p-xl fixed bottom-0 left-0 right-0 flex flex-col border-t bg-white shadow-[0px_4px_100px_0px_rgba(0,0,0,0.05)]">
      <div className="flex w-full items-center gap-[10px]">
        <button
          onClick={onImageClick}
          className="gap-xs flex items-center"
          type="button"
        >
          <MdOutlineImage size={20} className="text-gray-3" />
          <p className="text-13-medium text-gray-3">사진</p>
        </button>
        <button
          onClick={onVoteClick}
          className="gap-xs flex items-center"
          type="button"
        >
          <MdHowToVote size={20} className="text-gray-3" />
          <p className="text-13-medium text-gray-3">투표</p>
        </button>
      </div>
      <Button
        size="large"
        color={disabled ? "disabled" : "active"}
        onClick={onSubmit}
        disabled={disabled}
      >
        글 작성하기
      </Button>
    </div>
  );
}
