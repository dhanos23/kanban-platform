"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { FormField } from "@/components/molecules/FormField";
import { useAuth } from "@/hooks"; // Importación desde el archivo de barril

export default function LoginPage() {
  const router = useRouter();
  const { signIn, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    setIsLoading(true);

    try {
      await signIn({ email, password });
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthTemplate>
      <h2 className="text-xl font-semibold mb-6 text-center">Log In</h2>

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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary py-2 mt-2 flex justify-center"
        >
          {isLoading ? "Loading..." : "Log In"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-text-secondary">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthTemplate>
  );
}
