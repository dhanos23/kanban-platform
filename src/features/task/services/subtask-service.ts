import { supabase } from "@/lib/supabase";
import type { Subtask } from "@/types/supabase";

export const subtaskService = {
  async getSubtasksByTaskId(taskId: string): Promise<Subtask[]> {
    const { data, error } = await supabase
      .from("subtasks")
      .select("*")
      .eq("task_id", taskId);

    if (error) {
      throw new Error(`Error fetching subtasks: ${error.message}`);
    }

    return data || [];
  },

  async createSubtask(title: string, taskId: string): Promise<Subtask> {
    const { data, error } = await supabase
      .from("subtasks")
      .insert({
        title,
        task_id: taskId,
        is_completed: false,
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error creating subtask: ${error.message}`);
    }

    return data;
  },

  async updateSubtask(
    id: string,
    updates: {
      title?: string;
      is_completed?: boolean;
    },
  ): Promise<Subtask> {
    const { data, error } = await supabase
      .from("subtasks")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error updating subtask: ${error.message}`);
    }

    return data;
  },

  async toggleSubtaskCompletion(
    id: string,
    isCompleted: boolean,
  ): Promise<Subtask> {
    const { data, error } = await supabase
      .from("subtasks")
      .update({ is_completed: isCompleted })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error toggling subtask completion: ${error.message}`);
    }

    return data;
  },

  async deleteSubtask(id: string): Promise<void> {
    const { error } = await supabase.from("subtasks").delete().eq("id", id);

    if (error) {
      throw new Error(`Error deleting subtask: ${error.message}`);
    }
  },
};
