
import React from "react";

const StepProgress: React.FC = () => {
  return (
    <div className="md:col-span-3 space-y-8 hidden md:block">
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-sm mb-3">Progresso do Release</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-primary flex-shrink-0"></div>
            <span className="text-xs">Criação</span>
          </div>
          <div className="w-0.5 h-4 bg-gray-300 ml-2"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-300 flex-shrink-0"></div>
            <span className="text-xs text-gray-500">Revisão</span>
          </div>
          <div className="w-0.5 h-4 bg-gray-300 ml-2"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-300 flex-shrink-0"></div>
            <span className="text-xs text-gray-500">Aprovação</span>
          </div>
          <div className="w-0.5 h-4 bg-gray-300 ml-2"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-300 flex-shrink-0"></div>
            <span className="text-xs text-gray-500">Distribuição</span>
          </div>
          <div className="w-0.5 h-4 bg-gray-300 ml-2"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-300 flex-shrink-0"></div>
            <span className="text-xs text-gray-500">Monitoramento</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepProgress;
