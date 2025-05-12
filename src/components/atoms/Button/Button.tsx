"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary-large"
  | "primary-small"
  | "secondary"
  | "destructive";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button = ({
  children,
  className = "",
  variant = "primary-large",
  fullWidth = false,
  disabled = false,
  ...props
}: ButtonProps) => {
  // Aseguramos que usamos las clases correctas
  const buttonClasses = [
    `btn-${variant}`,
    disabled ? "btn-disabled" : "",
    fullWidth ? "btn-full" : "",
    "focus:btn-focus",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      {typeof children === "string" ? <span>{children}</span> : children}
    </button>
  );
};
