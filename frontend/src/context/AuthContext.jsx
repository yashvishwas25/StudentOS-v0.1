import { createContext, useState, useEffect } from "react";
import { loginRequest, registerRequest, getProfileRequest } from "../api/auth";

export const AuthContext = createContext(null);

const TOKEN_KEY = "studentos_token";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, if a token exists, fetch the profile to restore session
  useEffect(() => {
    const bootstrapAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await getProfileRequest();
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem(TOKEN_KEY);
      } finally {
        setLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  const login = async (username, password) => {
    const res = await loginRequest(username, password);
    localStorage.setItem(TOKEN_KEY, res.data.token);

    const profileRes = await getProfileRequest();
    setUser(profileRes.data);

    return res;
  };

  const register = async (username, password) => {
    return await registerRequest(username, password);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
