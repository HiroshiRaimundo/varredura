import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { getClientTypeTitle, getClientDescription } from "./ClientUtils";
import { ClientType } from "@/components/monitoring/utils/clientTypeUtils";

interface ClientHeaderProps {
  clientType: string;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ clientType }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/client")}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">Dashboard {getClientTypeTitle(clientType)}</h1>
        </div>
      </div>

      <Card className="border-l-4" style={{ borderLeftColor: 
        clientType === "observatory" ? "#3b82f6" : 
        clientType === "researcher" ? "#10b981" : 
        clientType === "politician" ? "#8b5cf6" : 
        "#f59e0b" 
      }}>
        <CardContent className="pt-6">
          <p>{getClientDescription(clientType)}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default ClientHeader;
