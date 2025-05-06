import { create } from "zustand";
import { boardService } from "@/features/board/services/board-service";
import { columnService } from "@/features/board/services/column-service";
import { taskService } from "@/features/task/services/task-service";
import { subtaskService } from "@/features/task/services/subtask-service";
import type { Board, Column, Task, Subtask } from "@/types/supabase";

type TasksByColumn = Record<string, Task[]>;
type SubtasksByTask = Record<string, Subtask[]>;

interface BoardState {
  boards: Board[];
  currentBoard: Board | null;
  columns: Column[];
  tasks: TasksByColumn;
  subtasks: SubtasksByTask;
  isLoading: boolean;
  error: string | null;

  // Board actions
  fetchBoards: () => Promise<void>;
  fetchBoardById: (id: string) => Promise<void>;
  createBoard: (title: string, ownerId: string) => Promise<void>;
  updateBoard: (id: string, title: string) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;

  // Column actions
  fetchColumns: (boardId: string) => Promise<void>;
  createColumn: (title: string, boardId: string) => Promise<void>;
  updateColumn: (id: string, title: string) => Promise<void>;
  deleteColumn: (id: string) => Promise<void>;

  // Task actions
  fetchTasks: (columnId: string) => Promise<void>;
  createTask: (
    title: string,
    columnId: string,
    description?: string,
    status?: string,
  ) => Promise<void>;
  updateTask: (
    id: string,
    updates: {
      title?: string;
      description?: string;
      status?: string;
      column_id?: string;
    },
  ) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (taskId: string, newColumnId: string) => Promise<void>;

  // Subtask actions
  fetchSubtasks: (taskId: string) => Promise<void>;
  createSubtask: (title: string, taskId: string) => Promise<void>;
  updateSubtask: (
    id: string,
    updates: { title?: string; is_completed?: boolean },
  ) => Promise<void>;
  toggleSubtaskCompletion: (id: string, isCompleted: boolean) => Promise<void>;
  deleteSubtask: (id: string) => Promise<void>;
}

export const useBoardStore = create<BoardState>()((set, get) => ({
  boards: [],
  currentBoard: null,
  columns: [],
  tasks: {},
  subtasks: {},
  isLoading: false,
  error: null,

  // Board actions
  fetchBoards: async () => {
    try {
      set({ isLoading: true, error: null });
      const boards = await boardService.getBoards();
      set({ boards, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchBoardById: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const board = await boardService.getBoardById(id);
      set({ currentBoard: board, isLoading: false });

      if (board) {
        get().fetchColumns(id);
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createBoard: async (title, ownerId) => {
    try {
      set({ isLoading: true, error: null });
      const newBoard = await boardService.createBoard(title, ownerId);
      set((state) => ({
        boards: [...state.boards, newBoard],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateBoard: async (id, title) => {
    try {
      set({ isLoading: true, error: null });
      const updatedBoard = await boardService.updateBoard(id, title);
      set((state) => {
        const updatedBoards = state.boards.map((board) =>
          board.id === id ? updatedBoard : board,
        );

        return {
          boards: updatedBoards,
          currentBoard:
            state.currentBoard?.id === id ? updatedBoard : state.currentBoard,
          isLoading: false,
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteBoard: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await boardService.deleteBoard(id);
      set((state) => {
        const filteredBoards = state.boards.filter((board) => board.id !== id);

        return {
          boards: filteredBoards,
          currentBoard:
            state.currentBoard?.id === id ? null : state.currentBoard,
          isLoading: false,
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  // Column actions
  fetchColumns: async (boardId) => {
    try {
      set({ isLoading: true, error: null });
      const columns = await columnService.getColumnsByBoardId(boardId);
      set({ columns, isLoading: false });

      // Fetch tasks for each column
      for (const column of columns) {
        get().fetchTasks(column.id);
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createColumn: async (title, boardId) => {
    try {
      set({ isLoading: true, error: null });
      const newColumn = await columnService.createColumn(title, boardId);
      set((state) => ({
        columns: [...state.columns, newColumn],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateColumn: async (id, title) => {
    try {
      set({ isLoading: true, error: null });
      const updatedColumn = await columnService.updateColumn(id, title);
      set((state) => {
        const updatedColumns = state.columns.map((column) =>
          column.id === id ? updatedColumn : column,
        );

        return {
          columns: updatedColumns,
          isLoading: false,
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteColumn: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await columnService.deleteColumn(id);
      set((state) => {
        const filteredColumns = state.columns.filter(
          (column) => column.id !== id,
        );
        const updatedTasks = { ...state.tasks };
        delete updatedTasks[id];

        return {
          columns: filteredColumns,
          tasks: updatedTasks,
          isLoading: false,
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  // Task actions
  fetchTasks: async (columnId) => {
    try {
      set({ isLoading: true, error: null });
      const tasks = await taskService.getTasksByColumnId(columnId);
      set((state) => {
        const updatedTasks = {
          ...state.tasks,
          [columnId]: tasks,
        };

        return {
          tasks: updatedTasks,
          isLoading: false,
        };
      });

      // Fetch subtasks for each task
      for (const task of tasks) {
        get().fetchSubtasks(task.id);
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createTask: async (title, columnId, description, status) => {
    try {
      set({ isLoading: true, error: null });
      const newTask = await taskService.createTask(
        title,
        columnId,
        description,
        status,
      );
      set((state) => {
        const columnTasks = state.tasks[columnId] || [];

        return {
          tasks: {
            ...state.tasks,
            [columnId]: [...columnTasks, newTask],
          },
          isLoading: false,
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateTask: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      const updatedTask = await taskService.updateTask(id, updates);

      set((state) => {
        // Find which column the task currently belongs to
        let oldColumnId = "";
        for (const [colId, tasks] of Object.entries(state.tasks)) {
          if (tasks.some((t) => t.id === id)) {
            oldColumnId = colId;
            break;
          }
        }

        // If column hasn't changed or wasn't found
        if (
          !updates.column_id ||
          oldColumnId === updates.column_id ||
          !oldColumnId
        ) {
          const columnId = updates.column_id || oldColumnId;
          if (!columnId) return { isLoading: false };

          const updatedTasks = {
            ...state.tasks,
            [columnId]: (state.tasks[columnId] || []).map((task) =>
              task.id === id ? updatedTask : task,
            ),
          };

          return {
            tasks: updatedTasks,
            isLoading: false,
          };
        }

        // If column has changed
        const newColumnId = updates.column_id;
        const oldColumnTasks = (state.tasks[oldColumnId] || []).filter(
          (task) => task.id !== id,
        );
        const newColumnTasks = [
          ...(state.tasks[newColumnId] || []),
          updatedTask,
        ];

        return {
          tasks: {
            ...state.tasks,
            [oldColumnId]: oldColumnTasks,
            [newColumnId]: newColumnTasks,
          },
          isLoading: false,
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteTask: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await taskService.deleteTask(id);

      set((state) => {
        // Find which column the task belongs to
        let columnId = "";
        for (const [colId, tasks] of Object.entries(state.tasks)) {
          if (tasks.some((t) => t.id === id)) {
            columnId = colId;
            break;
          }
        }

        if (!columnId) return { isLoading: false };

        // Create updated tasks map
        const updatedTasks = {
          ...state.tasks,
          [columnId]: (state.tasks[columnId] || []).filter(
            (task) => task.id !== id,
          ),
        };

        // Remove subtasks for this task
        const updatedSubtasks = { ...state.subtasks };
        delete updatedSubtasks[id];

        return {
          tasks: updatedTasks,
          subtasks: updatedSubtasks,
          isLoading: false,
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  moveTask: async (taskId, newColumnId) => {
    try {
      set({ isLoading: true, error: null });
      const updatedTask = await taskService.moveTaskToColumn(
        taskId,
        newColumnId,
      );

      set((state) => {
        // Find which column the task currently belongs to
        let oldColumnId = "";
        for (const [colId, tasks] of Object.entries(state.tasks)) {
          if (tasks.some((t) => t.id === taskId)) {
            oldColumnId = colId;
            break;
          }
        }

        if (!oldColumnId || oldColumnId === newColumnId)
          return { isLoading: false };

        // Update tasks in both columns
        const oldColumnTasks = (state.tasks[oldColumnId] || []).filter(
          (task) => task.id !== taskId,
        );
        const newColumnTasks = [
          ...(state.tasks[newColumnId] || []),
          updatedTask,
        ];

        return {
          tasks: {
            ...state.tasks,
            [oldColumnId]: oldColumnTasks,
            [newColumnId]: newColumnTasks,
          },
          isLoading: false,
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  // Subtask actions
  fetchSubtasks: async (taskId) => {
    try {
      set({ isLoading: true, error: null });
      const subtasks = await subtaskService.getSubtasksByTaskId(taskId);
      set((state) => ({
        subtasks: {
          ...state.subtasks,
          [taskId]: subtasks,
        },
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  // Continuación del código anterior...

  createSubtask: async (title, taskId) => {
    try {
      set({ isLoading: true, error: null });
      const newSubtask = await subtaskService.createSubtask(title, taskId);
      set((state) => {
        const taskSubtasks = state.subtasks[taskId] || [];

        return {
          subtasks: {
            ...state.subtasks,
            [taskId]: [...taskSubtasks, newSubtask],
          },
          isLoading: false,
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateSubtask: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      const updatedSubtask = await subtaskService.updateSubtask(id, updates);

      set((state) => {
        // Find which task the subtask belongs to
        let taskId = "";
        for (const [tId, subtasks] of Object.entries(state.subtasks)) {
          if (subtasks.some((s) => s.id === id)) {
            taskId = tId;
            break;
          }
        }

        if (!taskId) return { isLoading: false };

        return {
          subtasks: {
            ...state.subtasks,
            [taskId]: (state.subtasks[taskId] || []).map((subtask) =>
              subtask.id === id ? updatedSubtask : subtask,
            ),
          },
          isLoading: false,
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  toggleSubtaskCompletion: async (id, isCompleted) => {
    try {
      set({ isLoading: true, error: null });
      const updatedSubtask = await subtaskService.toggleSubtaskCompletion(
        id,
        isCompleted,
      );

      set((state) => {
        // Find which task the subtask belongs to
        let taskId = "";
        for (const [tId, subtasks] of Object.entries(state.subtasks)) {
          if (subtasks.some((s) => s.id === id)) {
            taskId = tId;
            break;
          }
        }

        if (!taskId) return { isLoading: false };

        return {
          subtasks: {
            ...state.subtasks,
            [taskId]: (state.subtasks[taskId] || []).map((subtask) =>
              subtask.id === id ? updatedSubtask : subtask,
            ),
          },
          isLoading: false,
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteSubtask: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await subtaskService.deleteSubtask(id);

      set((state) => {
        // Find which task the subtask belongs to
        let taskId = "";
        for (const [tId, subtasks] of Object.entries(state.subtasks)) {
          if (subtasks.some((s) => s.id === id)) {
            taskId = tId;
            break;
          }
        }

        if (!taskId) return { isLoading: false };

        return {
          subtasks: {
            ...state.subtasks,
            [taskId]: (state.subtasks[taskId] || []).filter(
              (subtask) => subtask.id !== id,
            ),
          },
          isLoading: false,
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
