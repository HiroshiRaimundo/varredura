import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, Database, Plus, Play, Pause, RefreshCw, Trash2, Filter as FilterIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Monitoring {
  id: string;
  name: string;
  url: string;
  apiUrl?: string;
  keywords: string[];
  category: string;
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
  responsible: string;
  status: 'active' | 'paused';
  lastUpdate: string;
  createdAt: string;
}

const exampleMonitorings: Monitoring[] = [
  {
    id: '1',
    name: 'Portal da Transparência - Licitações',
    url: 'https://www.portaltransparencia.gov.br/licitacoes',
    keywords: ['licitação', 'pregão', 'contrato'],
    category: 'Licitações',
    frequency: 'daily',
    responsible: 'João Silva',
    status: 'active',
    lastUpdate: new Date().toISOString(),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    name: 'Diário Oficial - Nomeações',
    url: 'https://www.in.gov.br',
    keywords: ['nomeação', 'exoneração', 'cargo'],
    category: 'Diário Oficial',
    frequency: 'daily',
    responsible: 'Maria Santos',
    status: 'active',
    lastUpdate: new Date().toISOString(),
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    name: 'IBGE - Indicadores Econômicos',
    url: 'https://www.ibge.gov.br/indicadores',
    keywords: ['inflação', 'PIB', 'desemprego'],
    category: 'Indicadores',
    frequency: 'monthly',
    responsible: 'Pedro Costa',
    status: 'paused',
    lastUpdate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const MonitoringContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'add' | 'manage'>('add');
  const [monitorings, setMonitorings] = useState<Monitoring[]>(exampleMonitorings);
  const [filter, setFilter] = useState('');
  const [categories, setCategories] = useState<string[]>(['Licitações', 'Diário Oficial', 'Indicadores', 'Legislação']);
  const [newCategory, setNewCategory] = useState('');
  const [newMonitoring, setNewMonitoring] = useState<Partial<Monitoring>>({
    frequency: 'daily',
    status: 'active',
    keywords: []
  });

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories(prev => [...prev, newCategory.trim()]);
      setNewCategory('');
      toast({
        title: "Categoria Adicionada",
        description: `A categoria "${newCategory}" foi adicionada com sucesso.`
      });
    }
  };

  const handleAddMonitoring = () => {
    if (!newMonitoring.name || !newMonitoring.url || !newMonitoring.responsible || !newMonitoring.category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    let keywordsArray: string[] = [];
    if (typeof newMonitoring.keywords === 'string') {
      keywordsArray = newMonitoring.keywords.split(',').map(k => k.trim());
    } else if (Array.isArray(newMonitoring.keywords)) {
      keywordsArray = newMonitoring.keywords;
    }

    const monitoring: Monitoring = {
      id: Date.now().toString(),
      name: newMonitoring.name!,
      url: newMonitoring.url!,
      apiUrl: newMonitoring.apiUrl,
      keywords: keywordsArray,
      category: newMonitoring.category!,
      frequency: newMonitoring.frequency!,
      responsible: newMonitoring.responsible!,
      status: 'active',
      lastUpdate: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    setMonitorings(prev => [...prev, monitoring]);
    setNewMonitoring({
      frequency: 'daily',
      status: 'active',
      keywords: []
    });

    toast({
      title: "Sucesso",
      description: "Monitoramento adicionado com sucesso!"
    });
  };

  const handleDeleteMonitoring = (id: string) => {
    setMonitorings(prev => prev.filter(m => m.id !== id));
    toast({
      title: "Monitoramento Removido",
      description: "O monitoramento foi removido com sucesso."
    });
  };

  const filteredMonitorings = monitorings.filter(m => 
    filter ? m.responsible.toLowerCase().includes(filter.toLowerCase()) : true
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Sistema de Monitoramento</h2>
        <p className="text-muted-foreground">
          Configure e gerencie seus monitoramentos
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="space-y-4">
        <TabsList>
          <TabsTrigger value="add" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Adicionar Monitoramento
          </TabsTrigger>
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Gerenciar Monitoramentos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Novo Monitoramento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome do Monitoramento *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Portal da Transparência - Licitações"
                    value={newMonitoring.name || ''}
                    onChange={e => setNewMonitoring(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="url">URL da Fonte *</Label>
                  <Input
                    id="url"
                    placeholder="https://..."
                    value={newMonitoring.url || ''}
                    onChange={e => setNewMonitoring(prev => ({ ...prev, url: e.target.value }))}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="apiUrl">URL da API (opcional)</Label>
                  <Input
                    id="apiUrl"
                    placeholder="https://api..."
                    value={newMonitoring.apiUrl || ''}
                    onChange={e => setNewMonitoring(prev => ({ ...prev, apiUrl: e.target.value }))}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="keywords">Palavras-chave (separadas por vírgula)</Label>
                  <Textarea
                    id="keywords"
                    placeholder="licitação, contrato, edital..."
                    value={Array.isArray(newMonitoring.keywords) ? newMonitoring.keywords.join(', ') : newMonitoring.keywords || ''}
                    onChange={e => setNewMonitoring(prev => ({ ...prev, keywords: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="category">Categoria *</Label>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Nova Categoria
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Adicionar Nova Categoria</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="newCategory">Nome da Categoria</Label>
                              <div className="flex gap-2">
                                <Input
                                  id="newCategory"
                                  value={newCategory}
                                  onChange={e => setNewCategory(e.target.value)}
                                  placeholder="Ex: Contratos"
                                />
                                <Button onClick={handleAddCategory}>
                                  Adicionar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Select
                      value={newMonitoring.category}
                      onValueChange={value => setNewMonitoring(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="frequency">Frequência *</Label>
                    <Select
                      value={newMonitoring.frequency}
                      onValueChange={value => setNewMonitoring(prev => ({ ...prev, frequency: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">A cada hora</SelectItem>
                        <SelectItem value="daily">Diário</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="responsible">Responsável *</Label>
                  <Input
                    id="responsible"
                    placeholder="Nome do responsável"
                    value={newMonitoring.responsible || ''}
                    onChange={e => setNewMonitoring(prev => ({ ...prev, responsible: e.target.value }))}
                  />
                </div>

                <Button className="w-full" onClick={handleAddMonitoring}>
                  Adicionar Monitoramento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Monitoramentos Ativos</CardTitle>
                <div className="flex items-center gap-2">
                  <FilterIcon className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Filtrar por responsável..."
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="w-[200px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {filteredMonitorings.map(monitoring => (
                    <div
                      key={monitoring.id}
                      className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{monitoring.name}</h4>
                          <Badge variant={monitoring.status === 'active' ? 'default' : 'secondary'}>
                            {monitoring.status === 'active' ? 'Ativo' : 'Pausado'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {monitoring.url}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {monitoring.keywords.map(keyword => (
                            <Badge key={keyword} variant="outline">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-muted-foreground">
                          <div>
                            <strong>Categoria:</strong> {monitoring.category}
                          </div>
                          <div>
                            <strong>Frequência:</strong> {monitoring.frequency}
                          </div>
                          <div>
                            <strong>Responsável:</strong> {monitoring.responsible}
                          </div>
                          <div>
                            <strong>Última atualização:</strong> {new Date(monitoring.lastUpdate).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setMonitorings(prev =>
                              prev.map(m =>
                                m.id === monitoring.id
                                  ? { ...m, status: m.status === 'active' ? 'paused' : 'active' }
                                  : m
                              )
                            );
                          }}
                        >
                          {monitoring.status === 'active' ? (
                            <><Pause className="h-4 w-4 mr-2" /> Pausar</>
                          ) : (
                            <><Play className="h-4 w-4 mr-2" /> Ativar</>
                          )}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteMonitoring(monitoring.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonitoringContent;
