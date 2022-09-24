import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { AuthRoutes } from "../auth";
import { Dashboard } from "../dashboard";
import { Home } from "../Home";
import { useAuthenticate } from "../hooks/UseAuthenticate";

export const AppRouter = () => {
  const { status, checkToken } = useAuthenticate();
  useEffect(() => {
    checkToken();
  }, []);

  if (status === "checking") {
    return <h1>Cargando...</h1>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {status === "authenticated" ? (
        <>
          <Route path="/app" element={<Dashboard />} />
          <Route path="/*" element={<Navigate to="/app" />} />
        </>
      ) : (
        <>
          <Route path="auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      )}
    </Routes>
  );
};
