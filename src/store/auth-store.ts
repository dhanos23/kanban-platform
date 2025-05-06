import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

interface AuthState {
  session: Session | null;
  user: {
    id: string;
    email: string | undefined;
    name?: string;
  } | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      signIn: async (email, password) => {
        try {
          set({ isLoading: true, error: null });

          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          set({
            session: data.session,
            user: data.user
              ? {
                  id: data.user.id,
                  email: data.user.email,
                  name: data.user.user_metadata?.name,
                }
              : null,
            isAuthenticated: !!data.session,
          });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },

      signUp: async (email, password) => {
        try {
          set({ isLoading: true, error: null });

          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });

          if (error) throw error;

          set({
            session: data.session,
            user: data.user
              ? {
                  id: data.user.id,
                  email: data.user.email,
                  name: data.user.user_metadata?.name,
                }
              : null,
            isAuthenticated: !!data.session,
          });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },

      signOut: async () => {
        try {
          set({ isLoading: true, error: null });

          const { error } = await supabase.auth.signOut();

          if (error) throw error;

          set({
            session: null,
            user: null,
            isAuthenticated: false,
          });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },

      refreshSession: async () => {
        try {
          set({ isLoading: true, error: null });

          const { data, error } = await supabase.auth.getSession();

          if (error) throw error;

          set({
            session: data.session,
            user: data.session?.user
              ? {
                  id: data.session.user.id,
                  email: data.session.user.email,
                  name: data.session.user.user_metadata?.name,
                }
              : null,
            isAuthenticated: !!data.session,
          });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        session: state.session,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
