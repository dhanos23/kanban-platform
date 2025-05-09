"use client";

import { usePathname } from "next/navigation";
import { BoardNavItem, CreateBoardButton } from "@/components/molecules";
interface Board {
  id: string;
  title: string;
}

interface BoardsListProps {
  boards: Board[];
  onCreateBoard: () => void;
}

export const BoardsList = ({ boards, onCreateBoard }: BoardsListProps) => {
  const pathname = usePathname();

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide">
      <h2 className="text-medium-grey text-xs tracking-[2.4px] font-bold uppercase ml-8 mb-5">
        ALL BOARDS ({boards.length})
      </h2>

      <nav className="space-y-1">
        {boards.length > 0 ? (
          boards.map((board) => (
            <BoardNavItem
              key={board.id}
              id={board.id}
              title={board.title}
              isActive={pathname === `/board/${board.id}`}
            />
          ))
        ) : (
          <div className="py-4 text-center text-medium-grey">No boards yet</div>
        )}

        <CreateBoardButton onClick={onCreateBoard} />
      </nav>
    </div>
  );
};
