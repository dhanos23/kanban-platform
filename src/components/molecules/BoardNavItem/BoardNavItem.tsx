import Link from "next/link";
import { BoardIcon } from "@/components/atoms/icons";

interface BoardNavItemProps {
  id: string;
  title: string;
  isActive: boolean;
}

export const BoardNavItem = ({ id, title, isActive }: BoardNavItemProps) => {
  return (
    <Link
      href={`/board/${id}`}
      className={`tw-nav-item font-bold ${isActive ? "active" : ""}`}
    >
      <BoardIcon
        className={`mr-4 w-4 h-4 ${isActive ? "text-white" : "text-medium-grey"}`}
      />
      <span>{title}</span>
    </Link>
  );
};
