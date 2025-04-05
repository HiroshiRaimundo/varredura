
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { SimpleReleaseData } from './types/dashboardTypes';

interface ReleaseTableProps {
  releases: SimpleReleaseData[];
}

const ReleaseTable: React.FC<ReleaseTableProps> = ({ releases }) => {
  return (
    <div className="space-y-2">
      {releases.map(release => (
        <div key={release.id} className="bg-background rounded-md p-3 border flex justify-between items-center">
          <div>
            <h3 className="font-medium">{release.title}</h3>
            <div className="flex space-x-2 text-xs text-muted-foreground">
              <span>Data: {release.date}</span>
              <span>Visualizações: {release.views}</span>
            </div>
          </div>
          <Badge variant={release.published ? "default" : "outline"}>
            {release.published ? "Publicado" : release.status}
          </Badge>
        </div>
      ))}
      {releases.length === 0 && (
        <p className="text-center py-6 text-muted-foreground">
          Nenhum resultado encontrado para a busca atual.
        </p>
      )}
    </div>
  );
};

export default ReleaseTable;
