
import React from 'react';

type ReleaseStatus = 'published' | 'pending' | 'scheduled' | 'approved' | 'rejected';

interface StatusBadgeProps {
  status: ReleaseStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  // Function to generate a code of color based on status
  const getStatusColor = (status: ReleaseStatus) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Function to format the status for display
  const getStatusLabel = (status: ReleaseStatus) => {
    switch (status) {
      case 'published':
        return 'Publicado';
      case 'pending':
        return 'Pendente';
      case 'scheduled':
        return 'Agendado';
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(status)}`}>
      {getStatusLabel(status)}
    </span>
  );
};

export default StatusBadge;
