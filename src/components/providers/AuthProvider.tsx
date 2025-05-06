// src/components/providers/AuthProvider.tsx
"use client";

import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { AuthError, AuthErrorType } from "@/types/auth";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signUp: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ user: User | null; session: Session | null }>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  error: null,
  signIn: async () => {},
  signUp: async () => ({ user: null, session: null }),
  signOut: async () => {},
  refreshSession: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const router = useRouter();

  // Creamos el cliente una sola vez
  const supabase = createClient();

  const refreshSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        throw {
          type: AuthErrorType.SESSION_ERROR,
          message: sessionError.message,
        };
      }

      setSession(data.session);
      setUser(data.session?.user ?? null);
    } catch (err) {
      console.error("Error getting session:", err);
      setError(
        (err as AuthError) || {
          type: AuthErrorType.UNKNOWN_ERROR,
          message: "Unknown error occurred",
        },
      );
    } finally {
      setIsLoading(false);
    }
  }, [supabase.auth]);

  useEffect(() => {
    // Cargar sesión inicial
    refreshSession();

    // Suscribirse a cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshSession, supabase.auth]);

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error: signInError } =
          await supabase.auth.signInWithPassword({ email, password });
        if (signInError) {
          throw {
            type: AuthErrorType.SIGN_IN_ERROR,
            message: signInError.message,
          };
        }
        setSession(data.session);
        setUser(data.user);
        router.push("/");
      } catch (err) {
        console.error("Sign in error:", err);
        setError(
          (err as AuthError) || {
            type: AuthErrorType.SIGN_IN_ERROR,
            message: "Failed to sign in",
          },
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [supabase.auth, router],
  );

  const signUp = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (signUpError) {
          throw {
            type: AuthErrorType.SIGN_UP_ERROR,
            message: signUpError.message,
          };
        }
        // Retornamos los datos para permitir su uso
        return data;
      } catch (err) {
        console.error("Sign up error:", err);
        setError(
          (err as AuthError) || {
            type: AuthErrorType.SIGN_UP_ERROR,
            message: "Failed to sign up",
          },
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [supabase.auth],
  );

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        throw {
          type: AuthErrorType.SIGN_OUT_ERROR,
          message: signOutError.message,
        };
      }
      setSession(null);
      setUser(null);
      router.push("/auth/login");
    } catch (err) {
      console.error("Sign out error:", err);
      setError(
        (err as AuthError) || {
          type: AuthErrorType.SIGN_OUT_ERROR,
          message: "Failed to sign out",
        },
      );
    } finally {
      setIsLoading(false);
    }
  }, [supabase.auth, router]);

  // Uso de useMemo para evitar renders innecesarios
  const value = useMemo(
    () => ({
      session,
      user,
      isLoading,
      error,
      signIn,
      signUp,
      signOut,
      refreshSession,
    }),
    [session, user, isLoading, error, signIn, signUp, signOut, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
