import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Database, RefreshCw, AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DataSource {
  id: string;
  name: string;
  type: 'api' | 'database' | 'file';
  provider: string;
  endpoint: string;
  frequency: 'realtime' | 'daily' | 'weekly' | 'monthly';
  status: 'active' | 'error' | 'pending';
  lastSync?: Date;
}

interface PublicDataIntegrationProps {
  dataSources: DataSource[];
  onAddSource: (source: Omit<DataSource, 'id'>) => void;
  onUpdateSource: (id: string, updates: Partial<DataSource>) => void;
  onRemoveSource: (id: string) => void;
  onSyncNow: (id: string) => Promise<void>;
}

const providers = {
  government: [
    { id: 'ibge', name: 'IBGE - Instituto Brasileiro de Geografia e Estatística' },
    { id: 'bcb', name: 'Banco Central do Brasil' },
    { id: 'inpe', name: 'INPE - Instituto Nacional de Pesquisas Espaciais' },
    { id: 'portal_transparencia', name: 'Portal da Transparência' },
  ],
  environment: [
    { id: 'inmet', name: 'INMET - Instituto Nacional de Meteorologia' },
    { id: 'ana', name: 'ANA - Agência Nacional de Águas' },
  ],
  health: [
    { id: 'datasus', name: 'DATASUS - Departamento de Informática do SUS' },
    { id: 'fiocruz', name: 'FIOCRUZ - Fundação Oswaldo Cruz' },
  ]
};

const PublicDataIntegration: React.FC<PublicDataIntegrationProps> = ({
  dataSources,
  onAddSource,
  onUpdateSource,
  onRemoveSource,
  onSyncNow,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSource, setNewSource] = useState<Partial<DataSource>>({
    type: 'api',
    frequency: 'daily',
    status: 'pending',
  });
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof providers>('government');

  const handleAddSource = () => {
    if (newSource.name && newSource.type && newSource.provider && newSource.endpoint) {
      onAddSource({
        name: newSource.name,
        type: newSource.type,
        provider: newSource.provider,
        endpoint: newSource.endpoint,
        frequency: newSource.frequency || 'daily',
        status: 'pending',
      });
      setShowAddForm(false);
      setNewSource({
        type: 'api',
        frequency: 'daily',
        status: 'pending',
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Integrações com Dados Públicos</span>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Cancelar' : 'Nova Integração'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="space-y-4 mb-6 p-4 border rounded-md">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Integração</Label>
                <Input
                  id="name"
                  value={newSource.name || ''}
                  onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                  placeholder="Ex: Dados Censitários IBGE"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value: keyof typeof providers) => setSelectedCategory(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="government">Governo</SelectItem>
                      <SelectItem value="environment">Meio Ambiente</SelectItem>
                      <SelectItem value="health">Saúde</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Provedor</Label>
                  <Select
                    value={newSource.provider}
                    onValueChange={(value) => setNewSource({ ...newSource, provider: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o provedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {providers[selectedCategory].map((provider) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Frequência de Atualização</Label>
                <Select
                  value={newSource.frequency}
                  onValueChange={(value: DataSource['frequency']) => 
                    setNewSource({ ...newSource, frequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Tempo Real</SelectItem>
                    <SelectItem value="daily">Diária</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endpoint">Endpoint da API</Label>
                <Input
                  id="endpoint"
                  value={newSource.endpoint || ''}
                  onChange={(e) => setNewSource({ ...newSource, endpoint: e.target.value })}
                  placeholder="https://api.exemplo.gov.br/dados"
                />
              </div>

              <Button onClick={handleAddSource} className="w-full">
                Adicionar Integração
              </Button>
            </div>
          )}

          <div className="space-y-4">
            {dataSources.map((source) => (
              <Card key={source.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <Database className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{source.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {source.provider} • {source.frequency}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {source.status === 'active' && (
                      <Alert className="bg-green-50 border-green-200 p-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-700">Ativo</AlertTitle>
                      </Alert>
                    )}
                    {source.status === 'error' && (
                      <Alert className="bg-red-50 border-red-200 p-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertTitle className="text-red-700">Erro</AlertTitle>
                      </Alert>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSyncNow(source.id)}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicDataIntegration; 