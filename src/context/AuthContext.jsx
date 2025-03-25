import { useEffect, useContext, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiClient } from "@/api/api";

import { getToken, setToken, clearToken } from "@/utils/storage";

const apiClient = new ApiClient();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      // TODO: verify token with backend
      if (token) {
        console.log("token verified");
      }
    };

    initAuth();
  }, []);

  const login = async (credential) => {
    if (isLoading) return;
    setIsLoading(true);
    const response = await apiClient.post("login", credential);
    setToken(response.data.token);
    setIsLoading(false);
    navigation("/home");
  };

  const logout = () => {
    clearToken();
    navigation("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// TODO: what is fast refresh
export const useAuth = () => useContext(AuthContext);
