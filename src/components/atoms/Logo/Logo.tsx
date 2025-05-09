"use client";

import Image from "next/image";
import { useTheme } from "@/hooks";

export const Logo = () => {
  const { theme } = useTheme();

  return (
    <div className="py-8 px-8">
      {theme === "dark" ? (
        <Image
          src="/images/logo-light.svg"
          alt="Kanban"
          width={152}
          height={26}
          priority
        />
      ) : (
        <Image
          src="/images/logo-dark.svg"
          alt="Kanban"
          width={152}
          height={26}
          priority
        />
      )}
    </div>
  );
};
