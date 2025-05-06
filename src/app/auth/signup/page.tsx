"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { FormField } from "@/components/molecules/FormField";
import { useAuth } from "@/hooks"; // Importación desde el archivo de barril

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirigir a la página principal si el usuario ya está autenticado
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      await signUp({ email, password });
      router.push("/auth/login?registered=true");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Failed to create account. Email may already be in use.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthTemplate>
      <h2 className="text-xl font-semibold mb-6 text-center">Create Account</h2>

      {error && (
        <div className="mb-4 p-3 bg-secondary/10 text-secondary rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormField label="Email" id="email">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </FormField>

        <FormField label="Password" id="password">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 rounded border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </FormField>

        <FormField label="Confirm Password" id="confirmPassword">
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 rounded border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </FormField>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary py-2 mt-2 flex justify-center"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          Log In
        </Link>
      </p>
    </AuthTemplate>
  );
}
