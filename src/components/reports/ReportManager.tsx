import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { FileText, Clock, Mail, Download, Trash2 } from "lucide-react";

interface ReportSchedule {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  format: 'pdf' | 'excel' | 'csv';
  recipients: string[];
  lastGenerated?: Date;
  nextGeneration?: Date;
}

interface ReportManagerProps {
  schedules: ReportSchedule[];
  onScheduleCreate: (schedule: Omit<ReportSchedule, 'id'>) => void;
  onScheduleDelete: (id: string) => void;
  onScheduleUpdate: (id: string, schedule: Partial<ReportSchedule>) => void;
}

const ReportManager: React.FC<ReportManagerProps> = ({
  schedules,
  onScheduleCreate,
  onScheduleDelete,
  onScheduleUpdate,
}) => {
  const [showNewSchedule, setShowNewSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState<Partial<ReportSchedule>>({
    frequency: 'weekly',
    format: 'pdf',
    recipients: [],
  });

  const handleCreateSchedule = () => {
    if (newSchedule.name && newSchedule.frequency && newSchedule.format) {
      onScheduleCreate({
        name: newSchedule.name,
        frequency: newSchedule.frequency,
        format: newSchedule.format,
        recipients: newSchedule.recipients || [],
      });
      setShowNewSchedule(false);
      setNewSchedule({
        frequency: 'weekly',
        format: 'pdf',
        recipients: [],
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Relatórios Agendados</span>
            <Button onClick={() => setShowNewSchedule(!showNewSchedule)}>
              {showNewSchedule ? 'Cancelar' : 'Novo Agendamento'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showNewSchedule && (
            <div className="space-y-4 mb-6 p-4 border rounded-md">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Relatório</Label>
                <Input
                  id="name"
                  value={newSchedule.name || ''}
                  onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
                  placeholder="Ex: Relatório Mensal de Desempenho"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Frequência</Label>
                  <Select
                    value={newSchedule.frequency}
                    onValueChange={(value: 'daily' | 'weekly' | 'monthly') => 
                      setNewSchedule({ ...newSchedule, frequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Formato</Label>
                  <Select
                    value={newSchedule.format}
                    onValueChange={(value: 'pdf' | 'excel' | 'csv') => 
                      setNewSchedule({ ...newSchedule, format: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipients">Destinatários (separados por vírgula)</Label>
                <Input
                  id="recipients"
                  value={newSchedule.recipients?.join(', ') || ''}
                  onChange={(e) => setNewSchedule({ 
                    ...newSchedule, 
                    recipients: e.target.value.split(',').map(email => email.trim()) 
                  })}
                  placeholder="email1@exemplo.com, email2@exemplo.com"
                />
              </div>

              <Button onClick={handleCreateSchedule} className="w-full">
                Criar Agendamento
              </Button>
            </div>
          )}

          <div className="space-y-4">
            {schedules.map((schedule) => (
              <Card key={schedule.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{schedule.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {schedule.frequency} • {schedule.format.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {/* Implementar download do último relatório */}}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onScheduleDelete(schedule.id)}
                    >
                      <Trash2 className="h-4 w-4" />
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

export default ReportManager; 