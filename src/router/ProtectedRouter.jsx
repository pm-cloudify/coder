import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter = () => {
  const { isAuthorized, isLoading } = useAuth();

  useEffect(() => {
    console.log(isAuthorized);
  }, [isAuthorized]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRouter;
