import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import useAuthContext from "../../features/Auth/authContext";

const Index = ({ children }) => {
  const navigate = useNavigate();
  const [token] = useAuthContext();
  const tokenValue = atob(window.localStorage.getItem("token") as string);
  useEffect(() => {
    if (!tokenValue) {
      navigate("/");
    }
  }, [token]);

  return <>{children}</>;
};

export default Index;
