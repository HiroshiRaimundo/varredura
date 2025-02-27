
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  frequency: string;
  category: string;
}

interface MonitoringListProps {
  items: MonitoringItem[];
  onDelete: (id: string) => void;
}

const MonitoringList: React.FC<MonitoringListProps> = ({ items, onDelete }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Monitoramentos Ativos</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            Nenhum item sendo monitorado ainda.
          </p>
        ) : (
          <div className="grid gap-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Categoria: {item.category}</p>
                      <p className="text-sm text-muted-foreground">Fonte: {item.url}</p>
                      <p className="text-sm text-muted-foreground">Frequência: {item.frequency}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(item.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonitoringList;
