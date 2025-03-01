
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";
import { ReleaseMonitoringItem } from "@/hooks/monitoring/types";

interface PublishedReleasesTabProps {
  releases: ReleaseMonitoringItem[];
}

const PublishedReleasesTab: React.FC<PublishedReleasesTabProps> = ({ releases }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Releases Publicados</CardTitle>
        <CardDescription>Todos os releases que foram publicados em veículos de mídia</CardDescription>
      </CardHeader>
      <CardContent>
        {releases.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Veículo</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead className="text-right">Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {releases.map((release) => (
                  <TableRow key={release.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {release.releaseTitle}
                      </div>
                    </TableCell>
                    <TableCell>{release.websiteName}</TableCell>
                    <TableCell>{release.publishedDate}</TableCell>
                    <TableCell>{release.publishedTime}</TableCell>
                    <TableCell className="text-right">
                      {release.url && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(release.url, '_blank')}
                          className="h-8 w-8 p-0"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Abrir link</span>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nenhum release publicado encontrado.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PublishedReleasesTab;
