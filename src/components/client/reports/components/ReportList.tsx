
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Report } from "../types";
import { formatDate } from "../utils/reportUtils";
import { toast } from "@/hooks/use-toast";

interface ReportListProps {
  reports: Report[];
}

const ReportList: React.FC<ReportListProps> = ({ reports }) => {
  const handleDownload = (report: Report) => {
    toast({
      title: "Download iniciado",
      description: `O download de "${report.title}" foi iniciado.`,
    });
    
    setTimeout(() => {
      toast({
        title: "Download concluído",
        description: `O download de "${report.title}" foi concluído.`,
      });
    }, 2000);
  };

  return (
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
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.title}</TableCell>
              <TableCell className="uppercase">{report.type}</TableCell>
              <TableCell>{formatDate(report.date)}</TableCell>
              <TableCell>{report.size}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center"
                  onClick={() => handleDownload(report)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  <span>Baixar</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportList;
