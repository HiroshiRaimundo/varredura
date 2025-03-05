import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useMonitoringService } from "@/services/monitoringService";

const MonitoringContent: React.FC = () => {
  const { monitoredItems, addItemToMonitor, removeMonitoredItem } = useMonitoringService();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Monitoramento de Conteúdo</h2>
        <p className="text-muted-foreground">
          Monitore menções e conteúdos relevantes em tempo real.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Novo Monitoramento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input 
                placeholder="Digite termos, frases ou URLs para monitorar"
                className="flex-1"
              />
              <Button>
                <Search className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Itens Monitorados</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monitoredItems?.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{item.term}</h4>
                    <p className="text-sm text-muted-foreground">
                      Última atualização: {new Date(item.lastUpdate).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Menções encontradas: {item.mentionsCount}
                    </p>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeMonitoredItem(item.id)}
                  >
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MonitoringContent;
