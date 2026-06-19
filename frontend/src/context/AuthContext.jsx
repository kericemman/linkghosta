import { createContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService.js";
import { clearStoredToken, getStoredToken, setStoredToken } from "../utils/storage.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(Boolean(getStoredToken()));

  useEffect(() => {
    if (!getStoredToken()) return;
    authService.currentAdmin()
      .then(({ data }) => setAdmin(data.data))
      .catch(() => clearStoredToken())
      .finally(() => setIsAuthLoading(false));
  }, []);

  async function login(payload) {
    const { data } = await authService.login(payload);
    setStoredToken(data.data.token);
    setAdmin(data.data.admin);
    return data.data.admin;
  }

  async function logout() {
    try {
      await authService.logout();
    } finally {
      clearStoredToken();
      setAdmin(null);
    }
  }

  const value = useMemo(
    () => ({
      admin,
      setAdmin,
      isAuthenticated: Boolean(admin),
      isAuthLoading,
      setIsAuthLoading,
      login,
      logout
    }),
    [admin, isAuthLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
