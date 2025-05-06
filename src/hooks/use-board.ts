import { useCallback, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export interface Board {
  id: string;
  title: string;
  owner_id: string;
  created_at: string;
}

export const useBoard = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBoards = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("boards")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBoards(data || []);
    } catch (err) {
      console.error("Error fetching boards:", err);
      setError(err instanceof Error ? err.message : "Error fetching boards");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    boards,
    isLoading,
    error,
    fetchBoards,
  };
};
