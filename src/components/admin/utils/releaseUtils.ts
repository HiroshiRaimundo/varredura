
export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'published':
      return 'Publicado';
    case 'pending':
      return 'Pendente';
    case 'scheduled':
      return 'Agendado';
    case 'draft':
      return 'Rascunho';
    case 'approved':
      return 'Aprovado';
    case 'rejected':
      return 'Rejeitado';
    default:
      return 'Desconhecido';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'scheduled':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'draft':
      return 'bg-gray-100 text-gray-800 border-gray-300';
    case 'approved':
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export const getClientTypeIcon = (type: string) => {
  switch (type) {
    case 'observatory':
      return 'BookOpen';
    case 'researcher':
      return 'UserCircle';
    case 'politician':
      return 'Building';
    case 'institution':
      return 'Building';
    case 'journalist':
      return 'Newspaper';
    default:
      return 'UserCircle';
  }
};

export const getClientTypeLabel = (type: string) => {
  switch (type) {
    case 'observatory':
      return 'Observatório';
    case 'researcher':
      return 'Pesquisador';
    case 'politician':
      return 'Político';
    case 'institution':
      return 'Instituição';
    case 'journalist':
      return 'Jornalista';
    default:
      return 'Desconhecido';
  }
};

// New functions for release monitoring
export const createMonitoringFromRelease = (release: ReleaseData): ReleaseMonitoring => {
  return {
    id: crypto.randomUUID(),
    releaseId: release.id,
    releaseTitle: release.title,
    targetWebsites: [release.mediaOutlet],
    monitoringFrequency: 'daily',
    lastChecked: new Date().toISOString(),
    status: 'active',
    results: []
  };
};

export const getRecommendedJournalists = (release: ReleaseData, journalists: JournalistContact[]): JournalistContact[] => {
  // Simple matching based on media outlet
  return journalists.filter(journalist => 
    journalist.mediaOutlet?.toLowerCase() === release.mediaOutlet?.toLowerCase()
  );
};

export const getPaginatedItems = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): T[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
};

export const calculateTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

// Mock function - in a real app, this would be an API call to a monitoring service
export const checkReleasePublications = async (
  monitoring: ReleaseMonitoring
): Promise<ReleaseMonitoringResult[]> => {
  // Simulate a check with a 10% chance of finding the release
  const hasFound = Math.random() < 0.1;
  
  if (!hasFound) {
    return [];
  }
  
  const website = monitoring.targetWebsites[Math.floor(Math.random() * monitoring.targetWebsites.length)];
  
  const result: ReleaseMonitoringResult = {
    id: crypto.randomUUID(),
    monitoringId: monitoring.id,
    foundUrl: `https://${website}/article-${Math.floor(Math.random() * 1000)}`,
    foundDate: new Date().toISOString().split('T')[0],
    foundTime: new Date().toTimeString().split(' ')[0],
    websiteName: website,
    excerptFound: `...mencionando "${monitoring.releaseTitle.substring(0, 30)}..."`,
    verified: true
  };
  
  return [result];
};
