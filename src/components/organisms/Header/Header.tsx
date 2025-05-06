import { useState, useContext } from "react";
import { useAuth } from "@/hooks";
import { BoardContext } from "@/app/board/BoardContext";

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const { currentBoard } = useContext(BoardContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showBoardMenu, setShowBoardMenu] = useState(false);

  return (
    <header className="h-16 border-b border-border bg-surface flex items-center px-4">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-md hover:bg-background-dark transition-colors md:hidden"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 12H21M3 6H21M3 18H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="flex-1 mx-4 flex items-center">
        <h2 className="text-xl font-bold truncate">
          {currentBoard?.title || "No board selected"}
        </h2>

        <button
          onClick={() => setShowBoardMenu(!showBoardMenu)}
          className="ml-2 p-1 text-text-secondary"
        >
          <svg width="12" height="8" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {showBoardMenu && (
          <div className="absolute top-16 left-0 right-0 md:left-auto md:right-auto md:ml-4 mt-1 p-4 bg-surface shadow-lg rounded-md z-10 max-w-xs">
            <div className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">
              All Boards (0)
            </div>
            {/* Aquí irá la lista de tableros en versión móvil */}
            <div className="pt-4 border-t border-border mt-4">
              <button className="flex items-center text-primary">
                <svg
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                </svg>
                <span className="ml-2">+ Create New Board</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button className="btn-primary hidden sm:block">+ Add New Task</button>

        <button className="btn-primary sm:hidden p-2">+</button>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center"
          >
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-surface ring-1 ring-border z-10">
              <div className="py-1">
                <p className="px-4 py-2 text-sm text-text-secondary truncate">
                  {user?.email || "Not signed in"}
                </p>
                <div className="border-t border-border"></div>
                <button
                  onClick={() => {
                    signOut();
                    setShowUserMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-secondary hover:bg-background-dark transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
