
import React from 'react';
import { ReleaseMonitoringItem } from '@/hooks/monitoring/types';

interface PublishedReleasesTabProps {
  releases: ReleaseMonitoringItem[];
}

const PublishedReleasesTab: React.FC<PublishedReleasesTabProps> = ({ releases }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Releases Publicados</h3>
      <div className="space-y-4">
        {releases.length === 0 ? (
          <p className="text-muted-foreground">Não há releases publicados para mostrar.</p>
        ) : (
          releases.map(release => (
            <div key={release.id} className="bg-background rounded-md p-3 border">
              <h3 className="font-medium">{release.releaseTitle}</h3>
              <div className="text-sm text-muted-foreground mt-1">
                <p>Publicado em: {release.websiteName}</p>
                <p>Data: {release.publishedDate} às {release.publishedTime}</p>
                {release.url && (
                  <a href={release.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Ver publicação
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PublishedReleasesTab;
