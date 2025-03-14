// Função para buscar todos os estudos do banco de dados ou API
export const getEstudos = async () => {
  try {
    // Substitua esta linha pela chamada real à sua API ou banco de dados
    const response = await fetch('/api/estudos');
    
    if (!response.ok) {
      throw new Error('Falha ao buscar estudos');
    }
    
    const data = await response.json();
    return data;
    
    // Se você ainda não tem uma API, pode usar dados de exemplo:
    /*
    return [
      {
        id: 1,
        titulo: "Estudo sobre biodiversidade no Amapá",
        autor: "João Silva",
        data: "2023-05-15",
        latitude: 0.9022,
        longitude: -52.0030,
        descricao: "Pesquisa sobre a fauna local",
        link: "https://exemplo.com/estudo1"
      },
      {
        id: 2,
        titulo: "Análise de qualidade da água em Macapá",
        autor: "Maria Souza",
        data: "2023-06-20",
        latitude: 0.0356,
        longitude: -51.0705,
        descricao: "Estudo sobre recursos hídricos",
        link: "https://exemplo.com/estudo2"
      }
    ];
    */
  } catch (error) {
    console.error("Erro ao buscar estudos:", error);
    throw error;
  }
}; 