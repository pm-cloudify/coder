import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Login from "@/pages/Login";
import Editor from "@/pages/Editor";
import ProtectedRouter from "./ProtectedRouter";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const AppRouter = () => {
  const { isAuthorized } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname == "/login" && isAuthorized) {
      navigate("/");
    } else if (!isAuthorized && location.pathname != "/login") {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized, location]);

  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route element={<ProtectedRouter />}>
        <Route path="/" element={<Editor />}></Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
