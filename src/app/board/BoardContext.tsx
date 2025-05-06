"use client";

import { createContext, ReactNode, useContext } from "react";
import { useBoardDetail } from "@/hooks";

// Exportar las interfaces para que puedan ser utilizadas por otros componentes
export interface Board {
  id: string;
  title: string;
  owner_id: string;
  created_at: string;
}

export interface Column {
  id: string;
  title: string;
  board_id: string;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  column_id: string;
  created_at: string;
}

export interface Subtask {
  id: string;
  title: string;
  is_completed: boolean;
  task_id: string;
  created_at: string;
}

interface BoardContextValue {
  currentBoard: Board | null;
  columns: Column[];
  tasks: Task[];
  subtasks: Subtask[];
  isLoading: boolean;
  error: string | null;
  fetchBoardDetail: (boardId: string) => Promise<void>;
}

export const BoardContext = createContext<BoardContextValue>({
  currentBoard: null,
  columns: [],
  tasks: [],
  subtasks: [],
  isLoading: false,
  error: null,
  fetchBoardDetail: async () => {},
});

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
};

interface BoardProviderProps {
  children: ReactNode;
  initialBoardId?: string;
}

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const boardDetailHook = useBoardDetail();

  // Quita useEffect aquí si no se usa
  // Si necesitas cargar datos iniciales, hazlo en el componente que usa este provider

  return (
    <BoardContext.Provider value={boardDetailHook}>
      {children}
    </BoardContext.Provider>
  );
};
