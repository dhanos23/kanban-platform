import { supabase } from "@/lib/supabase";
import type { Task } from "@/types/supabase";

export const taskService = {
  async getTasksByColumnId(columnId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("column_id", columnId);

    if (error) {
      throw new Error(`Error fetching tasks: ${error.message}`);
    }

    return data || [];
  },

  async getTaskById(id: string): Promise<Task | null> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Error fetching task: ${error.message}`);
    }

    return data;
  },

  async createTask(
    title: string,
    columnId: string,
    description?: string,
    status?: string,
  ): Promise<Task> {
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        title,
        column_id: columnId,
        description,
        status,
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error creating task: ${error.message}`);
    }

    return data;
  },

  async updateTask(
    id: string,
    updates: {
      title?: string;
      description?: string;
      status?: string;
      column_id?: string;
    },
  ): Promise<Task> {
    const { data, error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error updating task: ${error.message}`);
    }

    return data;
  },

  async deleteTask(id: string): Promise<void> {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      throw new Error(`Error deleting task: ${error.message}`);
    }
  },

  async moveTaskToColumn(taskId: string, newColumnId: string): Promise<Task> {
    const { data, error } = await supabase
      .from("tasks")
      .update({ column_id: newColumnId })
      .eq("id", taskId)
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error moving task: ${error.message}`);
    }

    return data;
  },
};
