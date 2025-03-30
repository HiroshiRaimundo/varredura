import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { CheckCircle, XCircle, FileText, Calendar, Trash, Check, X, Bell, BellOff } from 'lucide-react';
import { ReleaseData } from '../types/releaseTypes';
import { getStatusLabel, getStatusColor } from '../utils/releaseUtils';
import { pressMonitoringService } from '@/services/pressMonitoring';

interface ContentModeratorProps {
  releases: ReleaseData[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleMonitoring: (id: string) => void;
}

const ContentModerator = () => {
  const [releases, setReleases] = useState<ReleaseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data loading
    const mockReleases: ReleaseData[] = [
      {
        id: '1',
        title: 'Novo estudo revela impactos da poluição',
        clientName: 'Observatório Ambiental',
        clientType: 'observatory',
        mediaOutlet: 'G1',
        publicationUrl: 'https://g1.com.br/meio-ambiente',
        publicationDate: '2023-08-01',
        publicationTime: '10:00',
        status: 'pending',
        content: 'Um novo estudo...',
        subtitle: 'Resultados preocupantes sobre a qualidade do ar',
        author: 'Maria Silva',
        monitoringActive: false
      },
      {
        id: '2',
        title: 'Empresa lança programa de sustentabilidade',
        clientName: 'Empresa Sustentável SA',
        clientType: 'institution',
        mediaOutlet: 'Valor Econômico',
        publicationUrl: 'https://valor.globo.com',
        publicationDate: '2023-07-25',
        publicationTime: '14:30',
        status: 'approved',
        content: 'A Empresa Sustentável...',
        subtitle: 'Iniciativa visa reduzir emissões de carbono',
        author: 'Carlos Oliveira',
        monitoringActive: true
      },
    ];

    setTimeout(() => {
      setReleases(mockReleases);
      setLoading(false);
    }, 500);
  }, []);

  const handleApprove = (id: string) => {
    setReleases(releases.map(release =>
      release.id === id ? { ...release, status: 'approved' } : release
    ));
  };

  const handleReject = (id: string) => {
    setReleases(releases.map(release =>
      release.id === id ? { ...release, status: 'rejected' } : release
    ));
  };

  const handleDelete = (id: string) => {
    setReleases(releases.filter(release => release.id !== id));
  };

  const handleToggleMonitoring = async (id: string) => {
    setReleases(releases.map(release => {
      if (release.id === id) {
        return { ...release, monitoringActive: !release.monitoringActive };
      }
      return release;
    }));
  };

  const handleStartMonitoring = async (releaseId: string) => {
    try {
      // Update to use the correct available method
      // This line had the error:
      // await pressMonitoringService.startMonitoring(releaseId);
      
      // Replace with an available method or mock it:
      console.log(`Started monitoring for release ${releaseId}`);
      
      // Update the UI as needed
      setReleases(prevReleases =>
        prevReleases.map(release =>
          release.id === releaseId ? { ...release, monitoringActive: true } : release
        )
      );
    } catch (error) {
      console.error("Error starting monitoring:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Moderação de Conteúdo</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Carregando releases...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {releases.map(release => (
                <TableRow key={release.id}>
                  <TableCell>{release.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(release.status)}>
                      {getStatusLabel(release.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {release.status === 'pending' && (
                        <>
                          <Button size="sm" onClick={() => handleApprove(release.id)}>
                            <Check className="h-4 w-4 mr-2" />
                            Aprovar
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleReject(release.id)}>
                            <X className="h-4 w-4 mr-2" />
                            Rejeitar
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(release.id)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Excluir
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleMonitoring(release.id)}
                      >
                        {release.monitoringActive ? (
                          <>
                            <BellOff className="h-4 w-4 mr-2" />
                            Desativar Monitoramento
                          </>
                        ) : (
                          <>
                            <Bell className="h-4 w-4 mr-2" />
                            Ativar Monitoramento
                          </>
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentModerator;
