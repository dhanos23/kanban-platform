import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}

export const FormField = ({ label, id, error, children }: FormFieldProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1 text-text-primary"
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-secondary">{error}</p>}
    </div>
  );
};
