import { useCallback, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Board } from "@/app/board/BoardContext";

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

export const useBoardDetail = () => {
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBoardDetail = useCallback(async (boardId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Fetch board
      const { data: boardData, error: boardError } = await supabase
        .from("boards")
        .select("*")
        .eq("id", boardId)
        .single();

      if (boardError) throw boardError;

      // Fetch columns
      const { data: columnData, error: columnError } = await supabase
        .from("columns")
        .select("*")
        .eq("board_id", boardId)
        .order("created_at", { ascending: true });

      if (columnError) throw columnError;

      // Fetch tasks if columns exist
      let tasksData: Task[] = [];
      let subtasksData: Subtask[] = [];

      if (columnData && columnData.length > 0) {
        const columnIds = columnData.map((col) => col.id);

        const { data: fetchedTasks, error: tasksError } = await supabase
          .from("tasks")
          .select("*")
          .in("column_id", columnIds)
          .order("created_at", { ascending: true });

        if (tasksError) throw tasksError;

        tasksData = fetchedTasks || [];

        // Fetch subtasks if tasks exist
        if (tasksData.length > 0) {
          const taskIds = tasksData.map((task) => task.id);

          const { data: fetchedSubtasks, error: subtasksError } = await supabase
            .from("subtasks")
            .select("*")
            .in("task_id", taskIds)
            .order("created_at", { ascending: true });

          if (subtasksError) throw subtasksError;

          subtasksData = fetchedSubtasks || [];
        }
      }

      setCurrentBoard(boardData);
      setColumns(columnData || []);
      setTasks(tasksData);
      setSubtasks(subtasksData);
    } catch (err) {
      console.error("Error fetching board details:", err);
      setError(
        err instanceof Error ? err.message : "Error fetching board details",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    currentBoard,
    columns,
    tasks,
    subtasks,
    isLoading,
    error,
    fetchBoardDetail,
  };
};
