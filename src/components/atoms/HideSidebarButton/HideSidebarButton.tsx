import { HideSidebarIcon } from "@/components/atoms/icons";

interface HideSidebarButtonProps {
  onClick: () => void;
}

export const HideSidebarButton = ({ onClick }: HideSidebarButtonProps) => (
  <button
    onClick={onClick}
    className="tw-nav-item mt-2 font-bold"
    aria-label="Hide sidebar"
  >
    <HideSidebarIcon className="mr-3 w-4 h-4" />
    <span>Hide Sidebar</span>
  </button>
);
