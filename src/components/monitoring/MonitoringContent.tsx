
import React, { useState, useEffect } from 'react';
import { MonitoringItem } from '@/hooks/monitoring/types';

// Este arquivo contém código para a tela de configuração de monitoramentos
// Vamos criar um componente completo para monitoramentos

const MonitoringContent: React.FC<{
  monitoringToEdit?: MonitoringItem | null;
  setMonitoringData: React.Dispatch<React.SetStateAction<Partial<MonitoringItem>>>;
}> = ({ monitoringToEdit, setMonitoringData }) => {
  
  // Função para lidar com a mudança nas palavras-chave
  const handleKeywordsChange = (value: string) => {
    // Convertendo uma string separada por vírgulas para um array de strings
    const keywordsArray = value.split(',').map(k => k.trim()).filter(k => k !== '');
    
    // Atualizamos o estado monitoringData com o novo valor de keywords como string
    setMonitoringData(prev => ({
      ...prev,
      keywords: keywordsArray.join(', ') // Convertemos array para string
    }));
  };

  // E quando o usuário adicionar palavras-chave no input:
  const addKeyword = (keyword: string) => {
    if (!keyword.trim()) return;
    
    setMonitoringData(prev => {
      // Garantimos que keywords é uma string, mesmo que venha como array
      const currentKeywords = typeof prev.keywords === 'string' 
        ? prev.keywords.split(',').map(k => k.trim()).filter(k => k !== '')
        : Array.isArray(prev.keywords) ? prev.keywords : [];
      
      // Adicionamos a nova keyword e convertemos de volta para string
      const updatedKeywords = [...currentKeywords, keyword.trim()].join(', ');
      
      return {
        ...prev,
        keywords: updatedKeywords
      };
    });
  };

  // Garantir que quando carregamos um monitoramento existente para editar,
  // tratamos as keywords corretamente:
  useEffect(() => {
    if (monitoringToEdit) {
      // Garantimos que keywords seja sempre uma string
      let keywords = monitoringToEdit.keywords || '';
      
      // Se por algum motivo vier um array, convertemos para string
      if (Array.isArray(keywords)) {
        keywords = keywords.join(', ');
      }
      
      setMonitoringData({
        ...monitoringToEdit,
        keywords
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
