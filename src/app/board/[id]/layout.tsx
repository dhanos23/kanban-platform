"use client";

import { ReactNode } from "react";
import { BoardProvider } from "../BoardContext";

export default function BoardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  return <BoardProvider initialBoardId={params.id}>{children}</BoardProvider>;
}
