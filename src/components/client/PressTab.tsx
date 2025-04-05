
import React from "react";
import { ClientType } from "@/types/clientTypes";

interface PressTabProps {
  clientType: ClientType;
}

const PressTab: React.FC<PressTabProps> = ({ clientType }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Área de Assessoria de Imprensa</h2>
      <p>Gerencie seus releases, contatos e monitoramento de mídia.</p>
    </div>
  );
};

export default PressTab;
