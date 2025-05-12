"use client";

import Image from "next/image";
import { useTheme } from "@/hooks";

interface LogoProps {
  className?: string;
  size?: "default" | "small";
}

export const Logo = ({ className = "", size = "default" }: LogoProps) => {
  const { theme } = useTheme();

  const dimensions =
    size === "small" ? { width: 120, height: 20 } : { width: 152, height: 26 };

  return (
    <div className={`py-8 px-8 ${className}`}>
      {theme === "dark" ? (
        <Image
          src="/images/logo-light.svg"
          alt="Kanban"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="w-auto h-auto logo-transition"
        />
      ) : (
        <Image
          src="/images/logo-dark.svg"
          alt="Kanban"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="w-auto h-auto logo-transition"
        />
      )}
    </div>
  );
};
