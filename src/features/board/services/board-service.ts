import { supabase } from "@/lib/supabase";
import type { Board } from "@/types/supabase";

export const boardService = {
  async getBoards(): Promise<Board[]> {
    const { data, error } = await supabase
      .from("boards")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Error fetching boards: ${error.message}`);
    }

    return data || [];
  },

  async getBoardById(id: string): Promise<Board | null> {
    const { data, error } = await supabase
      .from("boards")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Error fetching board: ${error.message}`);
    }

    return data;
  },

  async createBoard(title: string, ownerId: string): Promise<Board> {
    const { data, error } = await supabase
      .from("boards")
      .insert({ title, owner_id: ownerId })
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error creating board: ${error.message}`);
    }

    return data;
  },

  async updateBoard(id: string, title: string): Promise<Board> {
    const { data, error } = await supabase
      .from("boards")
      .update({ title })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error updating board: ${error.message}`);
    }

    return data;
  },

  async deleteBoard(id: string): Promise<void> {
    const { error } = await supabase.from("boards").delete().eq("id", id);

    if (error) {
      throw new Error(`Error deleting board: ${error.message}`);
    }
  },
};
