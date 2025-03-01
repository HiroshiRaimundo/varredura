
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReleaseMonitoringItem } from "@/hooks/useMonitoring";
import { Check, X, ExternalLink, BarChart2, TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ReleaseMonitoringDashboardProps {
  monitoringResults: ReleaseMonitoringItem[];
}

const ReleaseMonitoringDashboard: React.FC<ReleaseMonitoringDashboardProps> = ({ monitoringResults }) => {
  // Calculate publication stats by date
  const getPublicationData = () => {
    // Get dates from monitoring results
    const dates = monitoringResults.map(item => item.publishedDate);
    
    // Count publications per date
    const countByDate: {[key: string]: number} = {};
    dates.forEach(date => {
      countByDate[date] = (countByDate[date] || 0) + 1;
    });
    
    // Convert to chart data format
    return Object.keys(countByDate).map(date => ({
      date,
      publicações: countByDate[date]
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  // Calculate publication stats by website
  const getWebsiteData = () => {
    // Count publications per website
    const countByWebsite: {[key: string]: number} = {};
    monitoringResults.forEach(item => {
      countByWebsite[item.websiteName] = (countByWebsite[item.websiteName] || 0) + 1;
    });
    
    // Convert to chart data format
    return Object.keys(countByWebsite).map(website => ({
      website,
      publicações: countByWebsite[website]
    }));
  };

  const publicationData = getPublicationData();
  const websiteData = getWebsiteData();
  
  // Calculate verification rate
  const verifiedCount = monitoringResults.filter(item => item.isVerified).length;
  const verificationRate = monitoringResults.length > 0 
    ? Math.round((verifiedCount / monitoringResults.length) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Total de Publicações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monitoringResults.length}</div>
            <p className="text-xs text-muted-foreground">
              Em {Array.from(new Set(monitoringResults.map(item => item.websiteName))).length} veículos diferentes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Taxa de Verificação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verificationRate}%</div>
            <p className="text-xs text-muted-foreground">
              {verifiedCount} de {monitoringResults.length} publicações verificadas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Último Release Publicado
            </CardTitle>
          </CardHeader>
          <CardContent>
            {monitoringResults.length > 0 ? (
              <>
                <div className="text-md font-medium truncate">
                  {monitoringResults[0].releaseTitle}
                </div>
                <p className="text-xs text-muted-foreground">
                  {monitoringResults[0].publishedDate} às {monitoringResults[0].publishedTime}
                </p>
              </>
            ) : (
              <div className="text-md">Nenhum release publicado</div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Publicações por Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              {publicationData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={publicationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="publicações" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Sem dados suficientes para o gráfico
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Lista de Publicações</CardTitle>
          </CardHeader>
          <CardContent>
            {monitoringResults.length > 0 ? (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Release</TableHead>
                      <TableHead>Veículo</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Verificado</TableHead>
                      <TableHead className="w-[50px]">Link</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monitoringResults.map(item => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium truncate max-w-[150px]">
                          {item.releaseTitle}
                        </TableCell>
                        <TableCell>{item.websiteName}</TableCell>
                        <TableCell>
                          {item.publishedDate}
                          <div className="text-xs text-muted-foreground">
                            {item.publishedTime}
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.isVerified ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <X className="h-4 w-4 text-red-600" />
                          )}
                        </TableCell>
                        <TableCell>
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center hover:text-primary"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Abrir</span>
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhuma publicação encontrada.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReleaseMonitoringDashboard;
