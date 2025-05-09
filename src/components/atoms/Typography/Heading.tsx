import React from "react";

interface HeadingProps {
  level: "xl" | "l" | "m" | "s";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  as,
  children,
  className = "",
}) => {
  const Component =
    as ||
    ({
      xl: "h1",
      l: "h2",
      m: "h3",
      s: "h4",
    }[level] as React.ElementType);

  const sizeClass = {
    xl: "text-heading-xl",
    l: "text-heading-l",
    m: "text-heading-m",
    s: "text-heading-s",
  }[level];

  return (
    <Component className={`${sizeClass} ${className}`}>{children}</Component>
  );
};
