
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Trash, Check, X, BookOpen, UserCircle, Building, Newspaper } from "lucide-react";
import { ReleaseData } from "../types/releaseTypes";
import { getStatusLabel, getStatusColor, getClientTypeLabel } from "../utils/releaseUtils";

interface ReleaseListProps {
  filteredReleases: ReleaseData[];
  handleView: (release: ReleaseData) => void;
  handleApprove: (id: string) => void;
  handleReject: (id: string) => void;
  handleDelete: (id: string) => void;
}

const ReleaseList: React.FC<ReleaseListProps> = ({
  filteredReleases,
  handleView,
  handleApprove,
  handleReject,
  handleDelete
}) => {

  const getClientTypeIcon = (type: string) => {
    switch (type) {
      case 'observatory':
        return <BookOpen className="h-4 w-4" />;
      case 'researcher':
        return <UserCircle className="h-4 w-4" />;
      case 'politician':
        return <Building className="h-4 w-4" />;
      case 'institution':
        return <Building className="h-4 w-4" />;
      case 'journalist':
        return <Newspaper className="h-4 w-4" />;
      default:
        return <UserCircle className="h-4 w-4" />;
    }
  };

  return (
    <>
      {filteredReleases.length > 0 ? (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Data
                  </div>
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReleases.map((release) => (
                <TableRow key={release.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate max-w-[200px]">{release.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{release.clientName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getClientTypeIcon(release.clientType)}
                      {getClientTypeLabel(release.clientType)}
                    </Badge>
                  </TableCell>
                  <TableCell>{release.mediaOutlet || 'N/A'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(release.status)}`}>
                      {getStatusLabel(release.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {release.publicationDate ? (
                      <div className="text-sm">
                        {release.publicationDate}
                        <span className="text-xs text-muted-foreground ml-1">
                          {release.publicationTime}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleView(release)}
                        className="h-8 w-8 p-0"
                      >
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Ver</span>
                      </Button>
                      
                      {release.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleApprove(release.id)}
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Aprovar</span>
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleReject(release.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Rejeitar</span>
                          </Button>
                        </>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(release.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum release encontrado com os filtros aplicados.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              // This will be handled by the parent component
              // onClearFilters()
            }}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </>
  );
};

export default ReleaseList;
