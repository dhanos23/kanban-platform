export type Board = {
  id: string;
  title: string;
  owner_id: string;
  created_at: string;
};

export type Column = {
  id: string;
  title: string;
  board_id: string;
};

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  column_id: string;
};

export type Subtask = {
  id: string;
  title: string;
  is_completed: boolean;
  task_id: string;
};
