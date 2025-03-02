
import React from "react";
import { ClientType } from "./ClientTypes";

interface PressTabProps {
  clientType: ClientType;
}

const PressTab: React.FC<PressTabProps> = ({ clientType }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Assessoria de Imprensa</h2>
      <p>Acesso à área de assessoria de imprensa para o tipo de cliente: {clientType}</p>
      {/* Additional press content would go here */}
    </div>
  );
};

export default PressTab;
