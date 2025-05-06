import { ReactNode } from "react";

interface AuthTemplateProps {
  children: ReactNode;
}

export const AuthTemplate = ({ children }: AuthTemplateProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background-dark p-4">
      <div className="w-full max-w-md p-6 bg-surface rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Kanban</h1>
        </div>
        {children}
      </div>
    </div>
  );
};
