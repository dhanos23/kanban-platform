import { useTheme, useBoard } from "@/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { theme, toggleTheme } = useTheme();
  const { boards } = useBoard();
  const pathname = usePathname();

  if (!isOpen) {
    return (
      <button
        onClick={toggleSidebar}
        className="fixed bottom-6 left-6 bg-primary text-white p-4 rounded-full shadow-lg"
        aria-label="Show sidebar"
      >
        <svg
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
        >
          <path d="M8.522 11.223a4.252 4.252 0 0 0 3.654-5.22l-3.654 5.22ZM9 12.25A8.685 8.685 0 0 0 16.5 8a8.612 8.612 0 0 0-2.76-2.864l.86-1.23A10.112 10.112 0 0 1 17.792 7.238a1.5 1.5 0 0 1 0 1.524A10.187 10.187 0 0 1 9 13.75c-.414 0-.828-.025-1.239-.074l1-1.43A8.88 8.88 0 0 0 9 12.25Zm-8.792-3.488a10.14 10.14 0 0 0 4.486 4.046l-1.504 2.148a.375.375 0 0 0 .092.523l.648.453a.375.375 0 0 0 .523-.092L14.81 1.044a.375.375 0 0 0-.092-.523L14.07.068a.375.375 0 0 0-.523.092L11.813 2.64A10.308 10.308 0 0 0 9 2.25c-3.746 0-7.031 2-8.792 4.988a1.5 1.5 0 0 0 0 1.524ZM1.5 8a8.674 8.674 0 0 1 6.755-4.219A1.75 1.75 0 1 1 5.25 5v-.001a4.25 4.25 0 0 0 1.154 5.366l-.834 1.192A8.641 8.641 0 0 1 1.5 8Z" />
        </svg>
      </button>
    );
  }

  return (
    <aside className="w-64 h-full bg-surface border-r border-border flex flex-col transition-all">
      <div className="py-6 px-4">
        <h1 className="text-2xl font-bold">Kanban</h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-4 py-2">
          <h2 className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">
            All Boards ({boards.length})
          </h2>

          <nav className="space-y-1">
            {boards.length > 0 ? (
              boards.map((board) => (
                <Link
                  key={board.id}
                  href={`/board/${board.id}`}
                  className={`block px-3 py-2 rounded-r-full ${
                    pathname === `/board/${board.id}`
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:bg-primary/10 hover:text-primary"
                  } transition-colors`}
                >
                  <div className="flex items-center">
                    <svg
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                    </svg>
                    <span className="ml-3 truncate">{board.title}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-4 text-center text-text-secondary">
                No boards yet
              </div>
            )}

            <button
              className="w-full text-left px-3 py-2 rounded-r-full text-primary hover:bg-primary/10 transition-colors"
              onClick={() => {
                /* Aquí irá la lógica para crear un nuevo tablero */
              }}
            >
              <div className="flex items-center">
                <svg
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                </svg>
                <span className="ml-3">+ Create New Board</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      <div className="p-4 mt-auto">
        <div className="flex items-center justify-center space-x-4 p-3 rounded-md bg-background-dark">
          {/* Theme toggle */}
          <span className="flex items-center justify-center">
            <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-.59.59a.833.833 0 0 1-1.18-1.178l.59-.59a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l.59.59a.833.833 0 0 1-1.179 1.179l-.59-.59a.833.833 0 0 1 .59-1.423ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-.59.59a.833.833 0 1 1-1.178-1.178l.59-.59a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l.59.59a.833.833 0 0 1-1.179 1.178l-.59-.59a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z"
                fill={theme === "dark" ? "#828FA3" : "#828FA3"}
              />
            </svg>
          </span>

          <button
            onClick={toggleTheme}
            className="relative w-10 h-5 rounded-full bg-primary"
          >
            <span
              className={`absolute w-3.5 h-3.5 rounded-full bg-white transition-transform transform ${
                theme === "dark" ? "translate-x-5" : "translate-x-1"
              } top-0.75`}
              style={{ top: "3px" }}
            ></span>
          </button>

          <span className="flex items-center justify-center">
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.474.682c.434-.11.718.406.481.767A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z"
                fill={theme === "dark" ? "white" : "#828FA3"}
              />
            </svg>
          </span>
        </div>

        <button
          onClick={toggleSidebar}
          className="mt-4 w-full text-left px-3 py-2 rounded-r-full text-text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <div className="flex items-center">
            <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
                fill="#828FA3"
              />
            </svg>
            <span className="ml-3">Hide Sidebar</span>
          </div>
        </button>
      </div>
    </aside>
  );
};
