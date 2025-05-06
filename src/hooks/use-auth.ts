import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export const useAuth = () => {
  const authStore = useAuthStore();

  // Refresh the session on component mount
  useEffect(() => {
    authStore.refreshSession();
  }, []);

  return authStore;
};
