
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

export const getCurrentMonth = () => {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const now = new Date();
  return `${months[now.getMonth()]} ${now.getFullYear()}`;
};

export const mockReports = [
  {
    id: "1",
    title: "Relatório Mensal de Monitoramento - Abril 2025",
    type: "pdf",
    date: "2025-04-01",
    size: "2.4 MB"
  },
  {
    id: "2",
    title: "Análise de Menções na Mídia - Q1 2025",
    type: "excel",
    date: "2025-03-31",
    size: "1.8 MB"
  },
  {
    id: "3",
    title: "Resultados de Campanhas de Comunicação",
    type: "pdf",
    date: "2025-03-15",
    size: "3.2 MB"
  }
];

export const clientInfo = {
  name: "João da Silva",
  company: "Empresa XYZ Ltda.",
  email: "joao.silva@empresaxyz.com.br",
  phone: "(11) 98765-4321",
  address: "Av. Paulista, 1234 - São Paulo/SP"
};
