import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const GitSyncButton: React.FC = () => {
  const { toast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      // In a real implementation, this would make an API call to your backend
      // which would handle the Git operations securely
      const response = await fetch('/api/git/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to sync with Git repository');
      }

      const data = await response.json();
      toast({
        title: 'Sincronização concluída',
        description: 'Repositório Git atualizado com sucesso!',
      });
    } catch (error) {
      console.error('Git sync error:', error);
      toast({
        title: 'Erro na sincronização',
        description: 'Não foi possível sincronizar com o repositório Git.',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Button
      onClick={handleSync}
      disabled={isSyncing}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      {isSyncing ? 'Sincronizando...' : 'Sincronizar com Git'}
    </Button>
  );
};

export default GitSyncButton;