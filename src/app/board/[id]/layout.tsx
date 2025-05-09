import React from "react";

interface BoardLayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

export default function BoardLayout({ children, params }: BoardLayoutProps) {
  const resolvedParams = React.use(params);
  const _boardId = resolvedParams.id;
  console.log(_boardId);
  return (
    <div>
      {/* Ahora puedes usar boardId en lugar de params.id */}
      {children}
    </div>
  );
}
