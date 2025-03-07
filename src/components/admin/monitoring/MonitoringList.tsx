import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MonitoringItem {
  id: string;
  name: string;
  type: string;
  status: string;
  lastUpdate: string;
  source: string;
  url?: string;
  apiEndpoint?: string;
}

export const MonitoringList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("todos");
  const [selectedStatus, setSelectedStatus] = useState<string>("todos");

  // Dados mockados para exemplo
  const monitoringItems: MonitoringItem[] = [
    {
      id: "1",
      name: "Portal do Governo",
      type: "url",
      status: "ativo",
      lastUpdate: "2024-03-07T14:30:00",
      source: "governo",
      url: "https://www.gov.br"
    },
    {
      id: "2",
      name: "API IBGE",
      type: "api",
      status: "ativo",
      lastUpdate: "2024-03-07T14:35:00",
      source: "api",
      apiEndpoint: "https://api.ibge.gov.br"
    }
  ];

  const filterItems = (items: MonitoringItem[]) => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.url?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
                          (item.apiEndpoint?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      
      const matchesType = selectedType === "todos" || item.type === selectedType;
      const matchesStatus = selectedStatus === "todos" || item.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  };

  const handleItemClick = (item: MonitoringItem) => {
    navigate(`/admin/monitoring/${item.id}`);
  };

  const handleAddNew = () => {
    navigate("/admin/monitoring/new");
  };

  const filteredItems = filterItems(monitoringItems);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Monitoramento</h2>
          <p className="text-muted-foreground">
            Gerencie suas fontes de monitoramento
          </p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Monitoramento
        </Button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar monitoramento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Tipos</SelectItem>
            <SelectItem value="url">URL</SelectItem>
            <SelectItem value="api">API</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Status</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
            <SelectItem value="erro">Erro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fontes de Monitoramento</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="space-y-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.type === "url" ? item.url : item.apiEndpoint}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={item.status === "ativo" ? "default" : "destructive"}>
                      {item.status}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Última atualização: {new Date(item.lastUpdate).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
