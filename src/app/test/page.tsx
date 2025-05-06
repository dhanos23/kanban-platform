"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useBoardStore } from "@/store/board-store";
import { supabase } from "@/lib/supabase";

export default function TestPage() {
  const [testMessage, setTestMessage] = useState<string>("");
  const [boardTitle, setBoardTitle] = useState<string>("");

  // Auth store
  const { user, isLoading: authLoading, error: authError } = useAuth();
  const isAuthenticated = !!user;

  // Board store
  const {
    boards,
    isLoading: boardsLoading,
    error: boardsError,
    fetchBoards,
    createBoard,
  } = useBoardStore();

  // Verificar sesión de Supabase
  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      setTestMessage(
        data.session
          ? "Sesión de Supabase activa"
          : "No hay sesión de Supabase",
      );
    }

    checkSession();
  }, []);

  // Cargar tableros cuando el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      fetchBoards();
    }
  }, [isAuthenticated, fetchBoards]);

  // Función para crear un nuevo tablero
  const handleCreateBoard = async () => {
    if (!isAuthenticated || !user) {
      alert("Debes iniciar sesión para crear un tablero");
      return;
    }

    if (!boardTitle.trim()) {
      alert("El título no puede estar vacío");
      return;
    }

    try {
      await createBoard(boardTitle, user.id);
      setBoardTitle("");
      alert("Tablero creado con éxito");
    } catch (error) {
      alert(
        `Error al crear tablero: ${error instanceof Error ? error.message : "Desconocido"}`,
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Página de Prueba de Integración
      </h1>

      <div className="bg-surface p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-2">Estado de Conexión</h2>
        <p className="mb-2">{testMessage}</p>
        <p className="mb-2">
          Estado de Auth:{" "}
          {authLoading
            ? "Cargando..."
            : isAuthenticated
              ? "Autenticado"
              : "No autenticado"}
        </p>
        {authError && <p className="text-secondary">Error: {authError}</p>}
        {user && (
          <div className="mt-2">
            <p>Usuario: {user.email}</p>
            <p>ID: {user.id}</p>
          </div>
        )}
      </div>

      {isAuthenticated && (
        <>
          <div className="bg-surface p-4 rounded mb-6">
            <h2 className="text-lg font-semibold mb-4">Crear nuevo tablero</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
                placeholder="Título del tablero"
                className="p-2 border rounded flex-grow"
              />
              <button
                onClick={handleCreateBoard}
                className="btn-primary"
                disabled={boardsLoading}
              >
                {boardsLoading ? "Creando..." : "Crear"}
              </button>
            </div>
          </div>

          <div className="bg-surface p-4 rounded">
            <h2 className="text-lg font-semibold mb-4">Mis tableros</h2>
            {boardsLoading ? (
              <p>Cargando tableros...</p>
            ) : boardsError ? (
              <p className="text-secondary">Error: {boardsError}</p>
            ) : boards.length === 0 ? (
              <p>No tienes tableros aún.</p>
            ) : (
              <ul className="space-y-2">
                {boards.map((board) => (
                  <li
                    key={board.id}
                    className="p-3 bg-surface-light rounded shadow"
                  >
                    <p className="font-medium">{board.title}</p>
                    <p className="text-xs text-text-secondary">
                      Creado: {new Date(board.created_at).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      {!isAuthenticated && !authLoading && (
        <div className="text-center py-8">
          <p className="mb-4">
            Necesitas iniciar sesión para ver tus tableros.
          </p>
          <button
            onClick={() => (window.location.href = "/auth/login")}
            className="btn-primary"
          >
            Ir a inicio de sesión
          </button>
        </div>
      )}
    </div>
  );
}
