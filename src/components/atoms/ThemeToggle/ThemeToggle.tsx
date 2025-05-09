"use client";

import { useTheme } from "@/hooks";
import { LightThemeIcon, DarkThemeIcon } from "@/components/atoms/icons";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-center space-x-6 py-3.5 px-6 rounded-md bg-light-grey dark:bg-very-dark-grey">
      <LightThemeIcon className="w-5 h-5 text-medium-grey" />

      <button
        onClick={toggleTheme}
        className="relative w-10 h-5 rounded-full bg-main-purple flex items-center"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <span
          className={`absolute w-3.5 h-3.5 rounded-full bg-white transition-transform transform ${
            theme === "dark" ? "translate-x-5" : "translate-x-1"
          }`}
          style={{ top: "3px" }}
        ></span>
      </button>

      <DarkThemeIcon className="w-4 h-4 text-medium-grey dark:text-white" />
    </div>
  );
};
