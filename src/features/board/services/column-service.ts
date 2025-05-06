import { supabase } from "@/lib/supabase";
import type { Column } from "@/types/supabase";

export const columnService = {
  async getColumnsByBoardId(boardId: string): Promise<Column[]> {
    const { data, error } = await supabase
      .from("columns")
      .select("*")
      .eq("board_id", boardId);

    if (error) {
      throw new Error(`Error fetching columns: ${error.message}`);
    }

    return data || [];
  },

  async createColumn(title: string, boardId: string): Promise<Column> {
    const { data, error } = await supabase
      .from("columns")
      .insert({ title, board_id: boardId })
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error creating column: ${error.message}`);
    }

    return data;
  },

  async updateColumn(id: string, title: string): Promise<Column> {
    const { data, error } = await supabase
      .from("columns")
      .update({ title })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error updating column: ${error.message}`);
    }

    return data;
  },

  async deleteColumn(id: string): Promise<void> {
    const { error } = await supabase.from("columns").delete().eq("id", id);

    if (error) {
      throw new Error(`Error deleting column: ${error.message}`);
    }
  },
};
