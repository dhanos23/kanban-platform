import React from "react";

interface BodyProps {
  size: "l" | "m";
  as?: "p" | "span" | "div";
  children: React.ReactNode;
  className?: string;
}

export const Body: React.FC<BodyProps> = ({
  size,
  as: Component = "p",
  children,
  className = "",
}) => {
  const sizeClass = {
    l: "text-body-l",
    m: "text-body-m",
  }[size];

  return (
    <Component className={`${sizeClass} ${className}`}>{children}</Component>
  );
};
