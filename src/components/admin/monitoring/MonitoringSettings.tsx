import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalysisSettings } from "./AnalysisSettings";

interface Settings {
  maxConcurrentMonitoring: number;
  defaultCheckInterval: number;
  retryAttempts: number;
  enableNotifications: boolean;
  enableErrorAlerts: boolean;
  enableChangeTracking: boolean;
  saveHistory: boolean;
  historyRetentionDays: number;
}

const defaultSettings: Settings = {
  maxConcurrentMonitoring: 10,
  defaultCheckInterval: 30,
  retryAttempts: 3,
  enableNotifications: true,
  enableErrorAlerts: true,
  enableChangeTracking: true,
  saveHistory: true,
  historyRetentionDays: 30
};

export const MonitoringSettings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    console.log("Configurações salvas:", settings);
    
    toast({
      title: "Sucesso",
      description: "Configurações atualizadas com sucesso!"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Configurações do Sistema</h2>
        <p className="text-muted-foreground">
          Gerencie as configurações gerais e de análise do sistema de monitoramento
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">Configurações Gerais</TabsTrigger>
          <TabsTrigger value="analysis">Configuração da Análise</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Configurações Gerais</h3>
              <p className="text-sm text-muted-foreground">
                Configure os parâmetros gerais do sistema de monitoramento
              </p>
            </div>

            <Separator />

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxConcurrent">Monitoramentos Simultâneos</Label>
                  <Input
                    id="maxConcurrent"
                    type="number"
                    value={settings.maxConcurrentMonitoring}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      maxConcurrentMonitoring: parseInt(e.target.value)
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultInterval">Intervalo Padrão (minutos)</Label>
                  <Input
                    id="defaultInterval"
                    type="number"
                    value={settings.defaultCheckInterval}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      defaultCheckInterval: parseInt(e.target.value)
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retryAttempts">Tentativas de Retry</Label>
                  <Input
                    id="retryAttempts"
                    type="number"
                    value={settings.retryAttempts}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      retryAttempts: parseInt(e.target.value)
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="historyRetention">Retenção de Histórico (dias)</Label>
                  <Input
                    id="historyRetention"
                    type="number"
                    value={settings.historyRetentionDays}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      historyRetentionDays: parseInt(e.target.value)
                    }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações</Label>
                    <p className="text-sm text-muted-foreground">
                      Ativar notificações de alterações
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      enableNotifications: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertas de Erro</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificar quando ocorrerem erros
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableErrorAlerts}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      enableErrorAlerts: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Rastreamento de Mudanças</Label>
                    <p className="text-sm text-muted-foreground">
                      Registrar todas as alterações detectadas
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableChangeTracking}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      enableChangeTracking: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Salvar Histórico</Label>
                    <p className="text-sm text-muted-foreground">
                      Manter histórico de monitoramentos
                    </p>
                  </div>
                  <Switch
                    checked={settings.saveHistory}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      saveHistory: checked
                    }))}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button onClick={handleSave}>
                Salvar Configurações
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <AnalysisSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
