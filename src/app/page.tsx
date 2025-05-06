"use client";

import { useEffect } from "react";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { useAuth, useBoard } from "@/hooks";
import { BoardProvider } from "./board/BoardContext";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const { boards, fetchBoards } = useBoard();

  useEffect(() => {
    // Si el usuario está autenticado, cargar los tableros
    if (user) {
      fetchBoards();
    }
  }, [user, fetchBoards]);

  // Mostrar un estado de carga mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BoardProvider>
      <DashboardTemplate>
        <div className="h-full flex flex-col items-center justify-center">
          {boards.length === 0 ? (
            <div className="text-center max-w-md p-6">
              <h2 className="text-xl font-bold mb-4">No boards found</h2>
              <p className="text-text-secondary mb-6">
                Create a new board to get started with your kanban experience.
              </p>
              <button className="btn-primary py-2 px-6">
                + Create New Board
              </button>
            </div>
          ) : (
            <div>
              {/* Aquí irá la visualización de tableros cuando estén implementados */}
              <p>Your boards will appear here</p>
            </div>
          )}
        </div>
      </DashboardTemplate>
    </BoardProvider>
  );
}
