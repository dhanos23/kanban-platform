"use client";

import { useState, useEffect } from "react";
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
  const [showButton, setShowButton] = useState(!isOpen);
  const { boards = [] } = useBoard() || {};

  // Manejar la animación del botón show sidebar
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setShowButton(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowButton(false);
    }
  }, [isOpen]);

  return (
    <>
      {/* Sidebar sin position fixed */}
      <aside
        className={`w-full h-full bg-white dark:bg-dark-grey border-r border-lines-light dark:border-lines-dark flex flex-col transition-all duration-300 ${!isOpen ? "overflow-hidden" : ""}`}
      >
        {isOpen && <Logo />}

        {isOpen && (
          <>
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
          </>
        )}
      </aside>

      {/* Botón show sidebar - fixed solo cuando sidebar está cerrado */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className={`fixed left-0 bottom-8 w-14 h-12 bg-main-purple hover:bg-main-purple-hover flex items-center justify-center text-white rounded-r-full shadow-md z-50 transition-all duration-300 ${showButton ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`}
          aria-label="Show sidebar"
        >
          <ShowSidebarIcon className="w-5 h-5" />
        </button>
      )}
    </>
  );
};
