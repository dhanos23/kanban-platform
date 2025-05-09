import { BoardIcon } from "@/components/atoms/icons";

interface CreateBoardButtonProps {
  onClick: () => void;
}

export const CreateBoardButton = ({ onClick }: CreateBoardButtonProps) => {
  return (
    <button
      className="tw-nav-item font-bold text-main-purple"
      onClick={onClick}
    >
      <BoardIcon className="mr-3 w-4 h-4" />
      <span>+ Create New Board</span>
    </button>
  );
};
