
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { AlertCircle, Bell, BellRing, Plus, Trash2, Save, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AlertRule {
  id: string;
  name: string;
  type: 'sentiment' | 'keyword' | 'volume' | 'competitor' | 'custom';
  condition: string;
  threshold?: number;
  keywords?: string[];
  active: boolean;
  createdAt: string;
  lastTriggered?: string;
}

const predefinedRules: AlertRule[] = [
  {
    id: '1',
    name: 'Alta menção negativa',
    type: 'sentiment',
    condition: 'Mais de 10 menções negativas em 1h',
    threshold: 10,
    active: true,
    createdAt: '2023-05-10T14:30:00Z',
    lastTriggered: '2023-05-12T09:15:00Z'
  },
  {
    id: '2',
    name: 'Menções de concorrentes',
    type: 'competitor',
    condition: 'Menção de concorrente com palavra-chave estratégica',
    keywords: ['concorrente-a', 'concorrente-b', 'estratégia', 'lançamento'],
    active: true,
    createdAt: '2023-04-22T10:00:00Z'
  },
  {
    id: '3',
    name: 'Queda de visibilidade',
    type: 'volume',
    condition: 'Queda de menções abaixo de 5 por dia',
    threshold: 5,
    active: false,
    createdAt: '2023-05-01T16:20:00Z'
  }
];

const IntelligentAlertSystem: React.FC = () => {
  const [rules, setRules] = useState<AlertRule[]>(predefinedRules);
  const [activeTab, setActiveTab] = useState('active');
  const [isAddingRule, setIsAddingRule] = useState(false);
  const [newRule, setNewRule] = useState<Partial<AlertRule>>({
    type: 'sentiment',
    active: true
  });
  
  const handleToggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
    
    toast({
      title: "Status do alerta atualizado",
      description: "A configuração do alerta foi alterada com sucesso."
    });
  };
  
  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    
    toast({
      title: "Alerta removido",
      description: "O alerta foi removido permanentemente."
    });
  };
  
  const handleSaveNewRule = () => {
    if (!newRule.name || !newRule.condition) {
      toast({
        title: "Não foi possível criar o alerta",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    const rule: AlertRule = {
      id: Date.now().toString(),
      name: newRule.name || 'Novo Alerta',
      type: newRule.type || 'custom',
      condition: newRule.condition || '',
      threshold: newRule.threshold,
      keywords: newRule.keywords,
      active: true,
      createdAt: new Date().toISOString()
    };
    
    setRules([rule, ...rules]);
    setIsAddingRule(false);
    setNewRule({
      type: 'sentiment',
      active: true
    });
    
    toast({
      title: "Alerta criado com sucesso",
      description: "O novo alerta inteligente está ativo."
    });
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sentiment':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'competitor':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'volume':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'sentiment':
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100">Sentimento</Badge>;
      case 'competitor':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">Concorrente</Badge>;
      case 'volume':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100">Volume</Badge>;
      case 'keyword':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">Palavra-chave</Badge>;
      default:
        return <Badge variant="outline">Personalizado</Badge>;
    }
  };
  
  const addRuleForm = (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Criar Novo Alerta</CardTitle>
        <CardDescription>Configure um alerta inteligente baseado em regras</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rule-name">Nome do Alerta</Label>
              <Input 
                id="rule-name"
                placeholder="Ex: Alerta de menções negativas"
                value={newRule.name || ''}
                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rule-type">Tipo de Alerta</Label>
              <select 
                id="rule-type"
                className="w-full px-3 py-2 border rounded-md"
                value={newRule.type}
                onChange={(e) => setNewRule({ ...newRule, type: e.target.value as any })}
              >
                <option value="sentiment">Sentimento</option>
                <option value="keyword">Palavra-chave</option>
                <option value="volume">Volume de menções</option>
                <option value="competitor">Concorrente</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rule-condition">Condição</Label>
            <Input 
              id="rule-condition"
              placeholder="Ex: Mais de 10 menções negativas em 1h"
              value={newRule.condition || ''}
              onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
            />
          </div>
          
          {(newRule.type === 'sentiment' || newRule.type === 'volume') && (
            <div className="space-y-2">
              <Label htmlFor="rule-threshold">Limite</Label>
              <Input 
                id="rule-threshold"
                type="number"
                placeholder="Ex: 10"
                value={newRule.threshold || ''}
                onChange={(e) => setNewRule({ ...newRule, threshold: parseInt(e.target.value) })}
              />
              <p className="text-xs text-muted-foreground">
                Define o limite numérico que ativa o alerta
              </p>
            </div>
          )}
          
          {(newRule.type === 'keyword' || newRule.type === 'competitor') && (
            <div className="space-y-2">
              <Label htmlFor="rule-keywords">Palavras-chave</Label>
              <Input 
                id="rule-keywords"
                placeholder="Separadas por vírgula. Ex: concorrente-a, lançamento"
                value={newRule.keywords?.join(', ') || ''}
                onChange={(e) => setNewRule({ 
                  ...newRule, 
                  keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                })}
              />
              <p className="text-xs text-muted-foreground">
                Define as palavras-chave que o sistema deve monitorar
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={() => setIsAddingRule(false)}>
          Cancelar
        </Button>
        <Button onClick={handleSaveNewRule}>
          <Save className="mr-2 h-4 w-4" />
          Salvar Alerta
        </Button>
      </CardFooter>
    </Card>
  );
  
  const filteredRules = rules.filter(rule => 
    activeTab === 'active' ? rule.active : !rule.active
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Sistema de Alertas Inteligentes</h2>
          <p className="text-muted-foreground">
            Configure alertas personalizados baseados em regras inteligentes
          </p>
        </div>
        
        <Button onClick={() => setIsAddingRule(!isAddingRule)}>
          {isAddingRule ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Concluir
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Novo Alerta
            </>
          )}
        </Button>
      </div>
      
      {isAddingRule && addRuleForm}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <BellRing className="h-4 w-4" />
            Alertas Ativos
          </TabsTrigger>
          <TabsTrigger value="inactive" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Alertas Desativados
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="pt-4">
          {filteredRules.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <BellRing className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-medium mb-1">Nenhum alerta ativo</h3>
              <p>Crie um novo alerta para começar a receber notificações</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRules.map(rule => (
                <Card key={rule.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                          {getTypeIcon(rule.type)}
                          {rule.name}
                        </CardTitle>
                        <CardDescription>{rule.condition}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTypeBadge(rule.type)}
                        <Switch 
                          checked={rule.active} 
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div>
                        Criado em: {new Date(rule.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                      {rule.lastTriggered && (
                        <div>
                          Último disparo: {new Date(rule.lastTriggered).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 ml-auto"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remover
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="inactive" className="pt-4">
          {filteredRules.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-medium mb-1">Nenhum alerta desativado</h3>
              <p>Todos os seus alertas estão ativos no momento</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRules.map(rule => (
                <Card key={rule.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                          {getTypeIcon(rule.type)}
                          {rule.name}
                        </CardTitle>
                        <CardDescription>{rule.condition}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTypeBadge(rule.type)}
                        <Switch 
                          checked={rule.active} 
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div>
                        Criado em: {new Date(rule.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                      {rule.lastTriggered && (
                        <div>
                          Último disparo: {new Date(rule.lastTriggered).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 ml-auto"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remover
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntelligentAlertSystem;
