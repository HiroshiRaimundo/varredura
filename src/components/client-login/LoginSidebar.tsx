
import React from "react";
import SuccessBanner from "./SuccessBanner";

interface LoginSidebarProps {
  title?: string;
}

export const LoginSidebar: React.FC<LoginSidebarProps> = ({ title = "Início" }) => {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-800 p-8 text-white md:w-1/2">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Área do Cliente</h3>
        <p className="text-blue-100">
          Acesse seu workspace e acompanhe suas métricas de monitoramento em tempo real.
        </p>
      </div>
      
      {/* Banner dinâmico com casos de sucesso */}
      <SuccessBanner />
    </div>
  );
};

export default LoginSidebar;
