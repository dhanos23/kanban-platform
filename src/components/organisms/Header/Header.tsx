"use client";

import { useState } from "react";
import { useBoard } from "@/hooks";
import { EllipsisVerticalIcon } from "@/components/atoms/icons";
import { Heading, Body } from "@/components/atoms/Typography";

interface HeaderProps {
  isSidebarOpen: boolean;
}

export const Header = ({ isSidebarOpen: _isSidebarOpen }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentBoard } = useBoard();

  const handleAddNewTask = () => {
    console.log("Add new task");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="h-24 flex items-center justify-between border-b border-lines-light dark:border-lines-dark bg-white dark:bg-dark-grey">
      <Heading level="xl" className="text-black dark:text-white pl-6">
        {currentBoard?.title || "Platform Launch"}
      </Heading>

      <div className="flex items-center pr-6">
        <button
          className="bg-main-purple hover:bg-main-purple-hover text-white rounded-full py-[15px] pl-6 pr-8 transition-colors w-[164px] h-[48px]"
          onClick={handleAddNewTask}
        >
          <Body size="m" as="span" className="flex items-center font-bold">
            <span className="mr-2">+</span>
            Add New Task
          </Body>
        </button>

        <div className="w-6 ml-6">
          <button
            onClick={toggleMenu}
            aria-label="Board options"
            className="text-medium-grey hover:text-main-purple transition-colors"
          >
            <EllipsisVerticalIcon />
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute right-6 top-[88px] bg-white dark:bg-very-dark-grey shadow-md rounded-lg p-4 z-50 min-w-[192px]">
            <ul className="space-y-4">
              <li>
                <button className="text-medium-grey hover:text-black dark:hover:text-white text-[13px] w-full text-left">
                  <Body size="l" as="span">
                    Edit Board
                  </Body>
                </button>
              </li>
              <li>
                <button className="text-red hover:text-red-hover text-[13px] w-full text-left">
                  <Body size="l" as="span">
                    Delete Board
                  </Body>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
