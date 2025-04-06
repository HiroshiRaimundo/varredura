
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export interface ReleasesListProps {
  filter: 'all' | 'pending' | 'approved' | 'rejected';
  onSelectRelease?: (releaseId: string, isSelected: boolean) => void;
  selectedReleases?: string[];
}

const ReleasesList: React.FC<ReleasesListProps> = ({ 
  filter,
  onSelectRelease,
  selectedReleases = []
}) => {
  // Mock releases data for demonstration
  const releases = [
    {
      id: 'rel1',
      title: 'Lançamento do Produto X',
      client: 'Empresa ABC',
      date: '2025-03-15',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 'rel2',
      title: 'Parceria Estratégica com XYZ',
      client: 'Empresa DEF',
      date: '2025-03-14',
      status: 'approved',
      priority: 'medium'
    },
    {
      id: 'rel3',
      title: 'Resultados Financeiros Q1',
      client: 'Empresa GHI',
      date: '2025-03-12',
      status: 'rejected',
      priority: 'low'
    },
    {
      id: 'rel4',
      title: 'Nova Política Ambiental',
      client: 'Empresa JKL',
      date: '2025-03-10',
      status: 'pending',
      priority: 'high'
    }
  ];

  const filteredReleases = filter === 'all' 
    ? releases 
    : releases.filter(release => release.status === filter);

  const handleCheckboxChange = (releaseId: string, checked: boolean) => {
    if (onSelectRelease) {
      onSelectRelease(releaseId, checked);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {onSelectRelease && (
              <TableHead className="w-12"></TableHead>
            )}
            <TableHead>Título</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReleases.length > 0 ? (
            filteredReleases.map(release => (
              <TableRow key={release.id}>
                {onSelectRelease && (
                  <TableCell>
                    <Checkbox 
                      checked={selectedReleases.includes(release.id)}
                      onCheckedChange={(checked) => handleCheckboxChange(release.id, !!checked)}
                    />
                  </TableCell>
                )}
                <TableCell className="font-medium">{release.title}</TableCell>
                <TableCell>{release.client}</TableCell>
                <TableCell>{new Date(release.date).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      release.status === 'approved' ? 'bg-green-100 text-green-800' :
                      release.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {release.status === 'approved' ? 'Aprovado' :
                     release.status === 'rejected' ? 'Rejeitado' :
                     'Pendente'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      release.priority === 'high' ? 'bg-red-100 text-red-800' :
                      release.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }
                  >
                    {release.priority === 'high' ? 'Alta' :
                     release.priority === 'medium' ? 'Média' :
                     'Baixa'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">Detalhes</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={onSelectRelease ? 7 : 6} className="text-center py-4">
                Nenhum release encontrado com o filtro aplicado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReleasesList;
