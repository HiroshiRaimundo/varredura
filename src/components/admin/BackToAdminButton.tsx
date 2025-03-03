import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BackToAdminButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      className="mb-4"
      onClick={() => navigate("/admin")}
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Voltar para Administração
    </Button>
  );
};

export default BackToAdminButton; 