
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BarChart, Download, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Report {
  id: string;
  title: string;
  type: "pdf" | "excel";
  date: string;
  size: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Relatório Mensal de Monitoramento - Abril 2025",
    type: "pdf",
    date: "2025-04-01",
    size: "2.4 MB"
  },
  {
    id: "2",
    title: "Análise de Menções na Mídia - Q1 2025",
    type: "excel",
    date: "2025-03-31",
    size: "1.8 MB"
  },
  {
    id: "3",
    title: "Resultados de Campanhas de Comunicação",
    type: "pdf",
    date: "2025-03-15",
    size: "3.2 MB"
  }
];

const ReportsTab: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatórios</CardTitle>
        <CardDescription>
          Acesse e baixe relatórios sobre seu monitoramento de mídia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button className="flex flex-col h-auto p-4 gap-2 items-center justify-center">
            <FileText className="h-8 w-8 mb-2" />
            <span>Gerar Relatório Mensal</span>
          </Button>
          <Button className="flex flex-col h-auto p-4 gap-2 items-center justify-center">
            <BarChart className="h-8 w-8 mb-2" />
            <span>Análise de Menções</span>
          </Button>
          <Button className="flex flex-col h-auto p-4 gap-2 items-center justify-center">
            <Calendar className="h-8 w-8 mb-2" />
            <span>Relatório Personalizado</span>
          </Button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Relatórios Disponíveis</h3>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell className="uppercase">{report.type}</TableCell>
                  <TableCell>{formatDate(report.date)}</TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      <span>Baixar</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsTab;
