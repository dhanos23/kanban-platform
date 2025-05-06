import { useEffect } from "react";
import { useBoardStore } from "@/store/board-store";
import { useAuth } from "./use-auth";

export const useBoard = () => {
  const boardStore = useBoardStore();
  const { user, isAuthenticated } = useAuth();

  // Fetch boards when the user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      boardStore.fetchBoards();
    }
  }, [isAuthenticated, user?.id]);

  return boardStore;
};
