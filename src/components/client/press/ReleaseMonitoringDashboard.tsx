
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, AlertCircle } from "lucide-react";
import { ReleaseMonitoringItem } from "@/hooks/monitoring/types";
import { ClientType } from "@/components/client/ClientTypes";

interface ReleaseMonitoringDashboardProps {
  monitoringResults: ReleaseMonitoringItem[];
  clientType?: ClientType; // Made optional to maintain compatibility
}

const ReleaseMonitoringDashboard: React.FC<ReleaseMonitoringDashboardProps> = ({ 
  monitoringResults,
  clientType 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitoramento de Releases na Mídia</CardTitle>
      </CardHeader>
      <CardContent>
        {monitoringResults.length > 0 ? (
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título do Release</TableHead>
                  <TableHead>Veículo</TableHead>
                  <TableHead>Data e Hora</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monitoringResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.releaseTitle}</TableCell>
                    <TableCell>{result.websiteName}</TableCell>
                    <TableCell>
                      {result.publishedDate} às {result.publishedTime}
                    </TableCell>
                    <TableCell>
                      {result.isVerified ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 flex items-center gap-1">
                          <Check className="h-3 w-3" /> Verificado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> Pendente
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <a 
                        href={result.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        Acessar <ExternalLink className="h-3 w-3" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhum resultado de monitoramento encontrado.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Os releases publicados serão monitorados automaticamente.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReleaseMonitoringDashboard;
