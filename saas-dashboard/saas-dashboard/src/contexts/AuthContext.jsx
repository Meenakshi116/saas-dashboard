import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("mock_jwt"));

  useEffect(() => {
    if (token) localStorage.setItem("mock_jwt", token);
    else localStorage.removeItem("mock_jwt");
  }, [token]);

  const login = ({ username, password }) => {
    if (password === "test123") {
      const mock = "jwt-demo-token";
      setToken(mock);
      return { ok: true };
    }
    return { ok: false, message: "Invalid credentials" };
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
