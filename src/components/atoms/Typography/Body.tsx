import React, { ReactNode, ElementType } from "react";

export type BodySize = "l" | "m";

export interface BodyProps extends React.HTMLAttributes<HTMLElement> {
  size: BodySize;
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

export const Body = ({
  size,
  children,
  as,
  className = "",
  ...props
}: BodyProps) => {
  const Component = as || "p";

  const sizeClasses = {
    l: "text-preset-5", // 13px body large
    m: "text-preset-6", // 12px body medium
  };

  return (
    <Component className={`${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </Component>
  );
};
