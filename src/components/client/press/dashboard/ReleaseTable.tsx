
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Calendar, Clock } from "lucide-react";
import StatusBadge from './StatusBadge';

interface PressReleaseData {
  id: string;
  title: string;
  mediaOutlet: string;
  publicationUrl: string;
  publicationDate: string;
  publicationTime: string;
  status: 'published' | 'pending' | 'scheduled' | 'approved' | 'rejected';
}

interface ReleaseTableProps {
  releases: PressReleaseData[];
}

const ReleaseTable: React.FC<ReleaseTableProps> = ({ releases }) => {
  if (releases.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhum release encontrado.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Veículo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[160px]">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Data
              </div>
            </TableHead>
            <TableHead className="w-[100px]">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Hora
              </div>
            </TableHead>
            <TableHead className="text-right">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {releases.map((release) => (
            <TableRow key={release.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {release.title}
                </div>
              </TableCell>
              <TableCell>{release.mediaOutlet || 'N/A'}</TableCell>
              <TableCell>
                <StatusBadge status={release.status} />
              </TableCell>
              <TableCell>{release.publicationDate || 'N/A'}</TableCell>
              <TableCell>{release.publicationTime || 'N/A'}</TableCell>
              <TableCell className="text-right">
                {release.status === 'published' && release.publicationUrl ? (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.open(release.publicationUrl, '_blank')}
                    className="h-8 w-8 p-0"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Abrir link</span>
                  </Button>
                ) : (
                  <span className="text-muted-foreground text-sm">N/A</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReleaseTable;
