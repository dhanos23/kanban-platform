"use client";

import { useState } from "react";
import { useBoard } from "@/hooks";
import { EllipsisVerticalIcon } from "@/components/atoms/icons";
import { Heading, Body } from "@/components/atoms/Typography";
import { Logo } from "@/components/atoms";
import { Button } from "@/components/atoms"; // Importar el componente Button

interface HeaderProps {
  isSidebarOpen: boolean;
}

export const Header = ({ isSidebarOpen }: HeaderProps) => {
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
      {!isSidebarOpen && (
        <div className="w-[209px] flex items-center justify-center border-r border-lines-light dark:border-lines-dark h-full">
          <Logo />
        </div>
      )}

      <div
        className={`flex-1 flex items-center transition-all duration-300 ${!isSidebarOpen ? "pl-6" : "pl-6"}`}
      >
        <Heading level="xl" className="text-black dark:text-white">
          {currentBoard?.title || "Platform Launch"}
        </Heading>
      </div>

      <div className="flex items-center pr-6">
        {/* Usar el componente Button en lugar de botón personalizado */}
        <Button
          variant="primary-large"
          onClick={handleAddNewTask}
          className="w-[164px]"
        >
          <span>+ Add New Task</span>
        </Button>

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
