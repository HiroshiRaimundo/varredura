import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, X } from "lucide-react";

interface MonitoringGroup {
  id: string;
  name: string;
  sources: string[];
  description?: string;
}

interface MonitoringSource {
  id: string;
  name: string;
  type: string;
}

export const MonitoringGroups: React.FC<{
  sources: MonitoringSource[];
  selectedSources: string[];
  onSourceSelect: (sources: string[]) => void;
}> = ({ sources, selectedSources, onSourceSelect }) => {
  const [groups, setGroups] = React.useState<MonitoringGroup[]>([
    {
      id: "gov",
      name: "Sites Governamentais",
      sources: sources.filter(s => s.type === "governo").map(s => s.id),
      description: "Todos os sites governamentais"
    },
    {
      id: "news",
      name: "Portais de Notícias",
      sources: sources.filter(s => s.type === "noticias").map(s => s.id),
      description: "Todos os portais de notícias"
    }
  ]);

  const [newGroupName, setNewGroupName] = React.useState("");

  const handleCreateGroup = () => {
    if (!newGroupName) return;
    
    const newGroup: MonitoringGroup = {
      id: `group-${Date.now()}`,
      name: newGroupName,
      sources: selectedSources,
      description: `Grupo personalizado: ${newGroupName}`
    };

    setGroups([...groups, newGroup]);
    setNewGroupName("");
  };

  const handleSelectGroup = (group: MonitoringGroup) => {
    onSourceSelect(group.sources);
  };

  const handleRemoveFromSelection = (sourceId: string) => {
    onSourceSelect(selectedSources.filter(id => id !== sourceId));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Nome do novo grupo..."
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <Button onClick={handleCreateGroup}>
          <Plus className="w-4 h-4 mr-2" />
          Criar Grupo
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Grupos Salvos</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="p-2 rounded-lg border hover:bg-accent cursor-pointer"
                    onClick={() => handleSelectGroup(group)}
                  >
                    <div className="font-medium">{group.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {group.sources.length} fontes
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Seleção Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {selectedSources.map((sourceId) => {
                  const source = sources.find(s => s.id === sourceId);
                  if (!source) return null;
                  
                  return (
                    <Badge
                      key={sourceId}
                      variant="secondary"
                      className="flex items-center justify-between p-2 w-full"
                    >
                      {source.name}
                      <X
                        className="w-4 h-4 cursor-pointer hover:text-destructive"
                        onClick={() => handleRemoveFromSelection(sourceId)}
                      />
                    </Badge>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
