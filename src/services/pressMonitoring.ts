
import { useState, useEffect, useRef } from 'react';

interface PressItem {
  id: string;
  title: string;
  outlet: string;
  date: string;
  url: string;
  verified: boolean;
}

export const usePressMonitoring = () => {
  const [pressItems, setPressItems] = useState<PressItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Usar useRef para evitar o erro de tipagem com clearInterval
  const intervalRef = useRef<number | null>(null);
  
  const mockPressItems: PressItem[] = [
    {
      id: '1',
      title: 'Empresa lança iniciativa sustentável',
      outlet: 'Jornal Econômico',
      date: new Date().toISOString(),
      url: 'https://example.com/noticia1',
      verified: true
    },
    {
      id: '2',
      title: 'Novo programa ambiental é anunciado',
      outlet: 'Portal Verde',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      url: 'https://example.com/noticia2',
      verified: false
    },
    {
      id: '3',
      title: 'Relatório aponta melhorias na qualidade do ar',
      outlet: 'Ciência Diária',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      url: 'https://example.com/noticia3',
      verified: true
    }
  ];
  
  // Função para carregar dados da API
  const fetchPressItems = async () => {
    try {
      // Simulando chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPressItems(mockPressItems);
      setIsLoading(false);
    } catch (err) {
      setError('Erro ao carregar dados de monitoramento');
      setIsLoading(false);
    }
  };
  
  // Iniciar monitoramento
  useEffect(() => {
    fetchPressItems();
    
    // Atualizar dados periodicamente
    intervalRef.current = window.setInterval(() => {
      fetchPressItems();
    }, 60000); // a cada minuto
    
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return {
    pressItems,
    isLoading,
    error,
    refreshData: fetchPressItems
  };
};
