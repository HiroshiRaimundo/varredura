
import React, { useState, useEffect } from 'react';
import { Monitoring } from '@/hooks/monitoring/types';

// Este arquivo contém código para a tela de configuração de monitoramentos
// Vamos criar um componente completo para monitoramentos

const MonitoringContent: React.FC<{
  monitoringToEdit?: Monitoring | null;
  setMonitoringData: React.Dispatch<React.SetStateAction<Partial<Monitoring>>>;
}> = ({ monitoringToEdit, setMonitoringData }) => {
  
  // Função para lidar com a mudança nas palavras-chave
  const handleKeywordsChange = (value: string) => {
    // Convertendo uma string separada por vírgulas para um array de strings
    const keywordsArray = value.split(',').map(k => k.trim()).filter(k => k !== '');
    
    // Atualizamos o estado monitoringData com o novo array de keywords
    setMonitoringData(prev => ({
      ...prev,
      keywords: keywordsArray // Agora armazenamos como array, não como string
    }));
  };

  // E quando o usuário adicionar palavras-chave no input:
  const addKeyword = (keyword: string) => {
    if (!keyword.trim()) return;
    
    setMonitoringData(prev => ({
      ...prev,
      keywords: [...(Array.isArray(prev.keywords) ? prev.keywords : []), keyword.trim()]
    }));
  };

  // Garantir que quando carregamos um monitoramento existente para editar,
  // tratamos as keywords corretamente:
  useEffect(() => {
    if (monitoringToEdit) {
      // Garantindo que keywords seja sempre um array
      let keywords = monitoringToEdit.keywords || [];
      
      // Se por algum motivo vier uma string, convertemos para array
      if (typeof keywords === 'string') {
        keywords = (keywords as unknown as string).split(',').map(k => k.trim()).filter(k => k !== '');
      }
      
      setMonitoringData({
        ...monitoringToEdit,
        keywords: keywords
      });
    }
  }, [monitoringToEdit, setMonitoringData]);

  return (
    <div>
      {/* Este é apenas um componente placeholder. 
      O conteúdo real seria implementado com formulários e campos específicos */}
      <p>Configuração de Monitoramento</p>
    </div>
  );
};

export default MonitoringContent;
