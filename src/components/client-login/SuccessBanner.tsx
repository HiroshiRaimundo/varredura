
import React, { useState, useEffect } from "react";

// Success cases for the dynamic banner
export const successCases = [
  {
    organization: "Instituto Verde Amazônia",
    result: "economizou 140 horas de análise manual"
  },
  {
    organization: "Observatório Nacional",
    result: "monitorou 5000 menções este mês"
  },
  {
    organization: "Prefeitura de Belém",
    result: "otimizou 60% do tempo de resposta à imprensa"
  },
  {
    organization: "Secretaria de Comunicação",
    result: "aumentou em 40% o alcance de seus releases"
  }
];

export const SuccessBanner: React.FC = () => {
  const [successCaseIndex, setSuccessCaseIndex] = useState(0);
  
  // Change success case every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSuccessCaseIndex((prevIndex) => (prevIndex + 1) % successCases.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg transition-all duration-500 ease-in-out">
      <h3 className="text-lg font-medium mb-2">História de Sucesso</h3>
      <h4 className="font-bold">{successCases[successCaseIndex].organization}</h4>
      <p className="text-blue-100 text-sm">{successCases[successCaseIndex].result}</p>
    </div>
  );
};

export default SuccessBanner;
