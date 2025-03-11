import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, ExternalLink, BarChart2, Info } from "lucide-react";

interface MonitoringItem {
  id: string;
  url: string;
  name?: string;
  type: 'url' | 'api';
  status: 'active' | 'inactive' | 'error';
  metrics: {
    name: string;
    value: number;
    trend: 'up' | 'down' | 'stable';
  }[];
}

interface MonitoringGroupProps {
  id: string;
  name: string;
  description?: string;
  items: MonitoringItem[];
  type: 'url' | 'api';
}

export const MonitoringGroup: React.FC<MonitoringGroupProps> = ({
  id,
  name,
  description,
  items,
  type
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-xl flex items-center gap-2">
            {name}
            <Badge variant={type === 'url' ? 'default' : 'secondary'}>
              {type === 'url' ? 'Sites' : 'APIs'}
            </Badge>
            <Badge variant="outline">{items.length} itens</Badge>
          </CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </CardHeader>

      <Collapsible open={isExpanded}>
        <CollapsibleContent>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-2">
                {paginatedItems.map((item) => (
                  <Card
                    key={item.id}
                    className={`border ${
                      selectedItems.includes(item.id)
                        ? 'border-primary'
                        : 'border-border'
                    }`}
                  >
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleItemSelect(item.id)}
                          >
                            {selectedItems.includes(item.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                          <div>
                            <div className="font-medium">
                              {item.name || item.url}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {item.url}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              item.status === 'active'
                                ? 'default'
                                : item.status === 'error'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {item.status}
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    {selectedItems.includes(item.id) && (
                      <CardContent className="pt-0">
                        <Tabs defaultValue="metrics">
                          <TabsList>
                            <TabsTrigger value="metrics">
                              <BarChart2 className="h-4 w-4 mr-2" />
                              Métricas
                            </TabsTrigger>
                            <TabsTrigger value="details">
                              <Info className="h-4 w-4 mr-2" />
                              Detalhes
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="metrics">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                              {item.metrics.map((metric) => (
                                <div
                                  key={metric.name}
                                  className="flex flex-col gap-1"
                                >
                                  <span className="text-sm text-muted-foreground">
                                    {metric.name}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg font-medium">
                                      {metric.value}
                                    </span>
                                    <Badge
                                      variant={
                                        metric.trend === 'up'
                                          ? 'default'
                                          : metric.trend === 'down'
                                          ? 'destructive'
                                          : 'secondary'
                                      }
                                    >
                                      {metric.trend}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                          <TabsContent value="details">
                            <div className="space-y-4 mt-4">
                              <div>
                                <h4 className="font-medium mb-2">
                                  Informações Adicionais
                                </h4>
                                <div className="text-sm text-muted-foreground">
                                  <p>Última verificação: {new Date().toLocaleString()}</p>
                                  <p>Tempo de resposta médio: 250ms</p>
                                  <p>Status: {item.status}</p>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </ScrollArea>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
