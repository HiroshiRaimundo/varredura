
import React from "react";
import { ClientInfo } from "../types";

interface ReportHeaderProps {
  clientInfo: ClientInfo;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ clientInfo }) => {
  return (
    <div className="border-b pb-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{clientInfo.company}</h3>
          <p className="text-sm text-muted-foreground">{clientInfo.address}</p>
          <p className="text-sm text-muted-foreground">{clientInfo.email} | {clientInfo.phone}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">Data de geração:</p>
          <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
