
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ReleaseData } from "./types/releaseTypes";
import { mockReleases, mockJournalists } from "./data/mockData";
import JournalistManagement from "./journalists/JournalistManagement";
import ReleaseList from "./releases/ReleaseList";
import ReleaseDetail from "./releases/ReleaseDetail";
import ReleaseFilters from "./releases/ReleaseFilters";

const ReleaseManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [releases, setReleases] = useState<ReleaseData[]>(mockReleases);
  const [selectedRelease, setSelectedRelease] = useState<ReleaseData | null>(null);
  const [viewingRelease, setViewingRelease] = useState(false);
  const [journalists, setJournalists] = useState(mockJournalists);
  
  const filteredReleases = releases.filter(release => {
    const matchesSearch = 
      release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.mediaOutlet.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || release.status === statusFilter;
    const matchesType = typeFilter === 'all' || release.clientType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este release?')) {
      setReleases(releases.filter(release => release.id !== id));
    }
  };

  const handleView = (release: ReleaseData) => {
    setSelectedRelease(release);
    setViewingRelease(true);
  };

  const handleApprove = (id: string) => {
    setReleases(releases.map(release => 
      release.id === id ? { ...release, status: 'approved' } : release
    ));
    
    toast({
      title: "Release aprovado",
      description: "O release foi aprovado e será enviado aos jornalistas."
    });
  };

  const handleReject = (id: string) => {
    setReleases(releases.map(release => 
      release.id === id ? { ...release, status: 'rejected' } : release
    ));
    
    toast({
      title: "Release rejeitado",
      description: "O release foi rejeitado e não será enviado."
    });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Releases</CardTitle>
        <CardDescription>
          Gerencie todos os releases de assessoria de imprensa em um só lugar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReleaseFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />

        <ReleaseList 
          filteredReleases={filteredReleases}
          handleView={handleView}
          handleApprove={handleApprove}
          handleReject={handleReject}
          handleDelete={handleDelete}
        />
        
        <ReleaseDetail 
          viewingRelease={viewingRelease}
          setViewingRelease={setViewingRelease}
          selectedRelease={selectedRelease}
          handleApprove={handleApprove}
          handleReject={handleReject}
        />
        
        <div className="mt-8">
          <JournalistManagement 
            journalists={journalists}
            setJournalists={setJournalists}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ReleaseManagement;
