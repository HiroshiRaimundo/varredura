
// Este arquivo contém código para a tela de configuração de monitoramentos
// Vamos corrigir apenas a parte que tem o erro relacionado a keywords

// Supondo que este trecho seja onde está o erro:
// Quando o componente carrega, se houver um monitoramento para editar,
// vamos garantir que o campo keywords seja tratado corretamente
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
      keywords = (keywords as string).split(',').map(k => k.trim()).filter(k => k !== '');
    }
    
    setMonitoringData({
      ...monitoringToEdit,
      keywords: keywords
    });
  }
}, [monitoringToEdit]);
