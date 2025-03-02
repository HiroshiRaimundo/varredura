
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { ClientType, clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";

interface ClientInfoProps {
  clientType: ClientType;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ clientType }) => {
  const colorClasses = getColorClasses(clientType);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informações do Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Plano:</span>
              <span className="font-medium">{clientTypeDetails[clientType].title}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Ativo
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Próxima cobrança:</span>
              <span className="font-medium">15/06/2024</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recursos Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {clientTypeDetails[clientType].features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className={`h-4 w-4 ${colorClasses.text} mt-1`} />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientInfo;
