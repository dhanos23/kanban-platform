"use client";

import { useBoard } from "@/hooks";
import {
  Logo,
  ThemeToggle,
  HideSidebarButton,
  ShowSidebarIcon,
} from "@/components/atoms";
import { BoardsList } from "@/components/molecules";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { boards = [] } = useBoard() || {};

  if (!isOpen) {
    return (
      <button
        onClick={toggleSidebar}
        className="fixed left-0 bottom-[32px] w-[56px] h-[48px] bg-main-purple hover:bg-main-purple-hover dark:bg-main-purple dark:hover:bg-main-purple-hover flex items-center justify-center text-white rounded-r-full shadow-md z-10 transition-colors"
        aria-label="Show sidebar"
      >
        <ShowSidebarIcon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <aside className="w-[300px] h-full bg-white dark:bg-dark-grey border-r border-lines-light dark:border-lines-dark flex flex-col transition-all duration-300">
      <Logo />

      <BoardsList
        boards={boards}
        onCreateBoard={() => {
          console.log("Create new board");
        }}
      />

      <div className="px-0 pb-8 mt-auto">
        <div className="mx-8 mb-2">
          <ThemeToggle />
        </div>
        <HideSidebarButton onClick={toggleSidebar} />
      </div>
    </aside>
  );
};
