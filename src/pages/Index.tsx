
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar para a nova página de dashboard
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
};

export default Index;
