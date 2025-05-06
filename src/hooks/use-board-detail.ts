import { useEffect } from "react";
import { useBoardStore } from "@/store/board-store";

export const useBoardDetail = (boardId: string | undefined) => {
  const boardStore = useBoardStore();

  // Fetch board details when the boardId changes
  useEffect(() => {
    if (boardId) {
      boardStore.fetchBoardById(boardId);
    }
  }, [boardId]);

  // Return only the data relevant to this specific board
  return {
    board: boardStore.currentBoard,
    columns: boardStore.columns,
    tasks: boardStore.tasks,
    subtasks: boardStore.subtasks,
    isLoading: boardStore.isLoading,
    error: boardStore.error,

    // Actions
    createColumn: boardStore.createColumn,
    updateColumn: boardStore.updateColumn,
    deleteColumn: boardStore.deleteColumn,

    createTask: boardStore.createTask,
    updateTask: boardStore.updateTask,
    deleteTask: boardStore.deleteTask,
    moveTask: boardStore.moveTask,

    createSubtask: boardStore.createSubtask,
    updateSubtask: boardStore.updateSubtask,
    toggleSubtaskCompletion: boardStore.toggleSubtaskCompletion,
    deleteSubtask: boardStore.deleteSubtask,
  };
};
