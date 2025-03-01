
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
