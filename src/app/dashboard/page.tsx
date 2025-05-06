"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useBoard } from "@/hooks/use-board";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { boards, fetchBoards, isLoading: boardsLoading } = useBoard();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchBoards();
    }
  }, [isAuthenticated, user?.id, fetchBoards]);

  if (authLoading || boardsLoading) {
    return <div className="p-4">Cargando...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4">
        <p>Necesitas iniciar sesión para ver esta página.</p>
        <button className="btn-primary mt-2">Iniciar sesión</button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mis tableros</h1>

      {boards.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-text-secondary mb-4">No tienes tableros aún</p>
          <button className="btn-primary">Crear primer tablero</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map((board) => (
            <div key={board.id} className="card">
              <h2 className="font-bold">{board.title}</h2>
              <p className="text-sm text-text-secondary">
                Creado: {new Date(board.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}

          <div className="card flex items-center justify-center border-2 border-dashed border-border">
            <button className="btn-primary">+ Nuevo tablero</button>
          </div>
        </div>
      )}
    </div>
  );
}
