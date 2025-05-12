import React, { ReactNode, forwardRef } from "react";

export type ButtonVariant =
  | "primary-large"
  | "primary-small"
  | "secondary"
  | "destructive";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  children: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
}

/**
 * Button component with built-in styling variants
 * Inherits typography from preset system
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      children,
      disabled = false,
      fullWidth = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    const baseClasses = "transition-colors";

    const variantClasses = {
      "primary-large": "btn-primary-large", // Uses text-preset-3
      "primary-small": "btn-primary-small", // Uses text-preset-6
      secondary: "btn-secondary", // Uses text-preset-6
      destructive: "btn-destructive", // Uses text-preset-6
    };

    const conditionalClasses = [
      disabled && "btn-disabled",
      fullWidth && "btn-full",
    ]
      .filter(Boolean)
      .join(" ");

    // Combine all classes
    const buttonClasses = [
      baseClasses,
      variantClasses[variant],
      conditionalClasses,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
