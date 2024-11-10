"use client";

import { useRouter } from "next/navigation";
import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type AppContextTypes = {
  isAuthenticated?: boolean | undefined;
  role?: string[] | null;
  login?: (role: string[]) => void;
  logout?: () => void;
  loading?: boolean | undefined;
  handleLoadingTrue?: () => void | undefined;
  handleLoadingFalse?: () => void | undefined;
  redirectFun?: (path: string) => void;
};

const AppContext = createContext<AppContextTypes | null>(null);

type AppProviderChildren = {
  children: ReactNode;
};

export const AppProvider: React.FC<AppProviderChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuthStatus = sessionStorage.getItem("isAuthenticated");
    return storedAuthStatus === "true";
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string[] | null>(() => {
    const storedRole = sessionStorage.getItem("role");
    return storedRole ? JSON.parse(storedRole) : null;
  });
  const router = useRouter();

  const login = (userRole: string[]) => {
    setIsAuthenticated(true);
    setRole(userRole);
    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("role", JSON.stringify(userRole));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    sessionStorage.setItem("isAuthenticated", "false");
    sessionStorage.removeItem("role");
  };

  const handleLoadingTrue = () => setLoading(true);
  const handleLoadingFalse = () => setLoading(false);

  const redirectFun = (path: string) => {
    setTimeout(() => {
      return router.push(path);
    }, 1000);
  };

  useEffect(() => {
    sessionStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    sessionStorage.setItem("role", JSON.stringify(role) || "");
  }, [isAuthenticated, role]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        role,
        login,
        logout,
        loading,
        handleLoadingTrue,
        handleLoadingFalse,
        redirectFun,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobally = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobally must be used within an AppProvider");
  }
  return context;
};
