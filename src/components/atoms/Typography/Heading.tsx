import React, { ReactNode } from "react";

export type HeadingLevel = "xl" | "l" | "m" | "s";
export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  children: ReactNode;
  as?: HeadingElement;
  className?: string;
}

export const Heading = ({
  level,
  children,
  as,
  className = "",
  ...props
}: HeadingProps) => {
  // Default semantic mapping
  const defaultElementMap: Record<HeadingLevel, HeadingElement> = {
    xl: "h1",
    l: "h2",
    m: "h3",
    s: "h4",
  };

  const Component = as || defaultElementMap[level];

  const levelClasses = {
    xl: "text-preset-1", // 24px heading
    l: "text-preset-2", // 18px heading
    m: "text-preset-3", // 15px heading
    s: "text-preset-4", // 12px heading uppercase
  };

  return (
    <Component className={`${levelClasses[level]} ${className}`} {...props}>
      {children}
    </Component>
  );
};
