
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, AlertCircle } from "lucide-react";

interface ReleasesListProps {
  filter: "all" | "pending" | "approved" | "rejected";
}

interface Release {
  id: string;
  title: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  category: string;
  feedback?: string;
}

const mockReleases: Release[] = [
  {
    id: "1",
    title: "Lançamento de novo produto sustentável",
    date: "2025-04-01",
    status: "approved",
    category: "product"
  },
  {
    id: "2",
    title: "Relatório anual de sustentabilidade",
    date: "2025-03-28",
    status: "pending",
    category: "report"
  },
  {
    id: "3",
    title: "Parceria estratégica com fornecedores",
    date: "2025-03-25",
    status: "rejected",
    category: "partnership",
    feedback: "Faltam informações sobre os termos da parceria. Por favor, revise e reenvie."
  },
  {
    id: "4",
    title: "Evento corporativo de inovação",
    date: "2025-03-20",
    status: "approved",
    category: "event"
  },
  {
    id: "5",
    title: "Mudanças na liderança corporativa",
    date: "2025-03-15",
    status: "pending",
    category: "corporate"
  }
];

const ReleasesList: React.FC<ReleasesListProps> = ({ filter }) => {
  const filteredReleases = filter === "all" 
    ? mockReleases 
    : mockReleases.filter(release => release.status === filter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprovado</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Reprovado</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  return (
    <div>
      {filteredReleases.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Nenhum release encontrado</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReleases.map((release) => (
              <TableRow key={release.id}>
                <TableCell className="font-medium">{release.title}</TableCell>
                <TableCell>{formatDate(release.date)}</TableCell>
                <TableCell>{getStatusBadge(release.status)}</TableCell>
                <TableCell>
                  {release.category ? (
                    <Badge variant="outline">
                      {release.category.charAt(0).toUpperCase() + release.category.slice(1)}
                    </Badge>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {release.feedback && (
                      <Button variant="ghost" size="icon" title={release.feedback}>
                        <AlertCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {release.status === "approved" && (
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ReleasesList;
