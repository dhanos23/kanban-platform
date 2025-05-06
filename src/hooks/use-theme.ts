import { useEffect } from "react";
import { useThemeStore } from "@/store/theme-store";

export const useTheme = () => {
  const themeStore = useThemeStore();

  // Apply the theme to the document when it changes
  useEffect(() => {
    document.documentElement.className = themeStore.theme;
  }, [themeStore.theme]);

  return themeStore;
};
