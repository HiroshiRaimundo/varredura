
import React from 'react';

const StatusLegend: React.FC = () => {
  return (
    <div className="mt-4 flex flex-col">
      <div className="flex gap-2 items-center mb-2">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-sm">Publicado: Release já veiculado na mídia</span>
      </div>
      <div className="flex gap-2 items-center mb-2">
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <span className="text-sm">Pendente: Release enviado, aguardando análise</span>
      </div>
      <div className="flex gap-2 items-center mb-2">
        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
        <span className="text-sm">Agendado: Release programado para envio futuro</span>
      </div>
      <div className="flex gap-2 items-center mb-2">
        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        <span className="text-sm">Aprovado: Release analisado e aprovado para envio</span>
      </div>
      <div className="flex gap-2 items-center">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <span className="text-sm">Rejeitado: Release precisa de ajustes antes de ser enviado</span>
      </div>
    </div>
  );
};

export default StatusLegend;
