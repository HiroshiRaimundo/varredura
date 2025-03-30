
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, AlertCircle, CheckCircle } from "lucide-react";

export interface ReleaseMonitoringDashboardProps {
  title: string;
  description: string;
  releases: {
    id: string;
    title: string;
    date: string;
    media: string[];
    status: string;
  }[];
}

const ReleaseMonitoringDashboard: React.FC<ReleaseMonitoringDashboardProps> = ({ 
  title, 
  description, 
  releases 
}) => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Releases em Monitoramento</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Veículos Monitorados</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {releases.map((release) => (
                <TableRow key={release.id}>
                  <TableCell className="font-medium">{release.title}</TableCell>
                  <TableCell>{new Date(release.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {release.media.slice(0, 2).map((medium, i) => (
                        <Badge key={i} variant="outline">{medium}</Badge>
                      ))}
                      {release.media.length > 2 && (
                        <Badge variant="outline">+{release.media.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      release.status === 'active' 
                        ? 'bg-green-100 text-green-800 border-green-300' 
                        : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                    }>
                      {release.status === 'active' ? 'Ativo' : 'Pendente'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver detalhes</span>
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <AlertCircle className="h-4 w-4" />
                        <span className="sr-only">Notificações</span>
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <CheckCircle className="h-4 w-4" />
                        <span className="sr-only">Marcar como verificado</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Monitoramento de Redes Sociais</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8">
              Para adicionar monitoramento de redes sociais aos seus releases, acesse a aba Dashboard 
              e configure o monitoramento na seção "Redes Sociais".
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReleaseMonitoringDashboard;
