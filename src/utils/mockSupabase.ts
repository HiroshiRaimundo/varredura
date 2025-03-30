
// Arquivo para criar mocks de funções do Supabase para evitar erros de tipagem

// Função genérica para simular retorno de dados
export const mockApiResponse = <T>(data: T) => {
  return Promise.resolve({
    data,
    error: null,
    count: data instanceof Array ? data.length : null,
    status: 200,
    statusText: 'OK'
  });
};

// Substituto para client.from que retorna um objeto compatível
export const mockFrom = (tableName: string) => {
  return {
    select: () => ({
      eq: () => ({
        single: () => mockApiResponse({}),
        data: [],
        error: null
      }),
      data: [],
      error: null
    }),
    insert: (data: any) => mockApiResponse({ ...data, id: 'mock-id' }),
    update: (data: any) => mockApiResponse(data),
    delete: () => mockApiResponse(null),
    upsert: (data: any) => mockApiResponse(data)
  };
};

// Helper para simular retornos de diferentes tipos de dados
export const mockData = {
  studies: [
    {
      id: '1',
      title: 'Estudo de Caso 1',
      author: 'Autor 1',
      co_authors: 'Co-autor 1',
      summary: 'Um resumo do estudo',
      repository_url: 'https://example.com',
      location: 'São Paulo',
      coordinates: [-23.5505, -46.6333],
      type: 'artigo'
    }
  ],
  monitoringItems: [
    {
      id: '1',
      name: 'Monitoramento 1',
      url: 'https://example.com',
      api_url: '',
      frequency: 'daily',
      category: 'Categoria',
      keywords: 'palavra1,palavra2',
      responsible: 'Responsável',
      notes: 'Notas'
    }
  ]
};
