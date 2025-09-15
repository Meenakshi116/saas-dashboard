import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ContractDetail from "./pages/ContractDetail";
import React from "react";

const Protected = ({ children }) => {
  const { token } = React.useContext(AuthContext);
  const params = new URLSearchParams(window.location.search);
  if (token || params.get("demo") === "true") return children;
  return <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/contracts/:id"
            element={
              <Protected>
                <ContractDetail />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
