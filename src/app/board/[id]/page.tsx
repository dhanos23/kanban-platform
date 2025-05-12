"use client";

import { useContext } from "react";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { BoardContext } from "../BoardContext";
import { Button } from "@/components/atoms";

export default function BoardDetailPage() {
  const { currentBoard, columns, isLoading, error } = useContext(BoardContext);

  if (isLoading) {
    return (
      <DashboardTemplate>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="text-text-secondary">Loading board...</p>
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  if (error) {
    return (
      <DashboardTemplate>
        <div className="flex h-full items-center justify-center">
          <div className="text-center max-w-md p-6">
            <h2 className="text-xl font-bold text-secondary mb-4">Error</h2>
            <p className="text-text-secondary mb-6">{error}</p>
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  if (!currentBoard) {
    return (
      <DashboardTemplate>
        <div className="flex h-full items-center justify-center">
          <div className="text-center max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Board not found</h2>
            <p className="text-text-secondary mb-6">
              The board you are looking for does not exist or you dont have
              access to it.
            </p>
            <div className="space-y-4">
              {/* Botón primario grande */}
              <Button variant="primary-large">Button Primary (L)</Button>

              {/* Botón primario pequeño */}
              <Button variant="primary-small">Button Primary (S)</Button>

              {/* Botón secundario */}
              <Button variant="secondary">Button Secondary</Button>

              {/* Botón destructivo */}
              <Button variant="destructive">Button Destructive</Button>

              {/* Botón con icono */}
              <Button variant="primary-large">Add New Task</Button>

              {/* Botón deshabilitado */}
              <Button variant="primary-large" disabled>
                Disabled Button
              </Button>

              {/* Botón de ancho completo */}
              <Button variant="secondary" fullWidth>
                Full Width Button
              </Button>
            </div>
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  return (
    <DashboardTemplate>
      {columns.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <div className="text-center max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">This board is empty</h2>
            <p className="text-text-secondary mb-6">
              Create a new column to get started with your tasks.
            </p>
            <button className="btn-primary py-2 px-6">+ Add New Column</button>
          </div>
        </div>
      ) : (
        <div className="h-full flex overflow-x-auto py-6 px-4">
          {/* Aquí irán las columnas y tareas cuando estén implementadas */}
          <p>Columns will appear here</p>
        </div>
      )}
    </DashboardTemplate>
  );
}
