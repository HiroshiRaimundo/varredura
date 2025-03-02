
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ClientMonitoringForm from "./ClientMonitoringForm";
import { Button } from "@/components/ui/button";
import { Plus, List } from "lucide-react";
import { ClientType } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";

interface MonitoringTabProps {
  clientType: ClientType;
}

const MonitoringTab: React.FC<MonitoringTabProps> = ({ clientType }) => {
  const [activeTab, setActiveTab] = useState<"list" | "add">("list");
  const colorClasses = getColorClasses(clientType);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Monitoramento de Dados</h2>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === "list" ? "default" : "outline"}
            className={activeTab === "list" ? colorClasses.bg : ""}
            onClick={() => setActiveTab("list")}
          >
            <List className="mr-2 h-4 w-4" />
            Lista de Monitoramentos
          </Button>
          <Button
            variant={activeTab === "add" ? "default" : "outline"}
            className={activeTab === "add" ? colorClasses.bg : ""}
            onClick={() => setActiveTab("add")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Novo
          </Button>
        </div>
      </div>

      {activeTab === "list" ? (
        <div className="bg-muted p-6 rounded-lg border text-center">
          <h3 className="text-lg font-medium mb-2">Seus Monitoramentos</h3>
          <p className="text-muted-foreground">
            Esta página mostrará todos os seus monitoramentos ativos. No momento, não há nenhum monitoramento configurado.
          </p>
          <Button
            className={`mt-4 ${colorClasses.bg}`}
            onClick={() => setActiveTab("add")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Seu Primeiro Monitoramento
          </Button>
        </div>
      ) : (
        <ClientMonitoringForm />
      )}
    </div>
  );
};

export default MonitoringTab;
