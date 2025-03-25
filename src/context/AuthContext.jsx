import { useEffect, useContext, useState, createContext } from "react";
import { ApiClient } from "@/api/api";

import { getToken, setToken, clearToken } from "@/utils/storage";

const apiClient = new ApiClient();

const AuthContext = createContext({
  isAuthorized: false,
  isLoading: false,
  login: () => Promise.reject(new Error("login function not implemented")),
  logout: () => {},
});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthorized, setAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      // TODO: verify token with backend
      if (token) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credential) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await apiClient.post("login", credential);
      setToken(response.data.token);
      setAuthorized(true);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const logout = () => {
    clearToken();
    setAuthorized(false);
  };

  const value = {
    isAuthorized,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// TODO: what is fast refresh
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
